import { Controller, Delete, Get, KoaController, Post, Pre, Put, Validate, Validator } from 'koa-joi-controllers';
import { Context } from 'koa';
import { NotesRepository } from '../repositories/notes.repository';
import { NoteDto } from '../models/note';
import { access } from '../middleware/middleware';
import { log } from '../logger/log';
import { Errors } from '../error/errors';

@Controller()
export class NotesController extends KoaController {
  private readonly notesRepository: NotesRepository;

  constructor(notesRepository: NotesRepository) {
    super();
    this.notesRepository = notesRepository;
  }

  @Get('/list')
  @Pre(access)
  async list(ctx: Context) {
    log.debug(`Getting all notes for user=${ctx.user}`);
    const notes = await this.notesRepository.list(ctx.user);
    ctx.send(200, {notes});
  }

  @Post('/create')
  @Validate({
    type: 'json',
    body: {
      title: Validator.Joi.string().max(40).required(),
      content: Validator.Joi.string().max(200).required()
    }
  })
  @Pre(access)
  async create(ctx: Context) {
    const {title, content} = ctx.request.body;
    const note = await this.notesRepository.create({title, content, user: ctx.user});
    log.debug('New note created.', note);
    ctx.send(201, {note: NoteDto.from(note)});
  }

  @Put('/edit')
  @Validate({
    type: 'json',
    body: {
      id: Validator.Joi.string().max(24).required(),
      title: Validator.Joi.string().max(40),
      content: Validator.Joi.string().max(200)
    }
  })
  @Pre(access)
  async edit(ctx: Context) {
    const {id, title, content} = ctx.request.body;
    log.debug(`User with id=${ctx.user} editing note`, ctx.request.body);
    const success = await this.notesRepository.update(id, ctx.user, {title, content});
    if (!success) {
      log.warn(`User with id=${ctx.user} cannot edit note with id=${id}`);
      throw Errors.notFound('Note not found.');
    }
    ctx.send(204);
  }

  @Delete('/delete/:id')
  @Pre(access)
  async deleteUser(ctx: Context) {
    log.debug(`User with id=${ctx.user} deleting note with id=${ctx.params.id}`);
    const success = await this.notesRepository.remove(ctx.params.id, ctx.user);
    if (!success) {
      log.warn(`User with id=$ctx.user} cannot delete note with id=${ctx.params.id}`);
      throw Errors.notFound('Note not found.');
    }
    ctx.send(204);
  }
}
