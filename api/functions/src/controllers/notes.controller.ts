import { Controller, Delete, Get, Json, KoaController, Post, Pre, Put } from 'koa-joi-controllers';
import { Context } from 'koa';
import { NotesRepository } from '../repositories/notes.repository';
import { NoteDto } from '../models/note';
import { access } from '../middleware/middleware';
import { log } from '../logger/log';

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
  @Json() // TODO validate input
  @Pre(access)
  async create(ctx: Context) {
    const {title, content} = ctx.request.body;
    const note = await this.notesRepository.create({title, content, user: ctx.user});
    log.debug('New note created.', note);
    ctx.send(201, {note: NoteDto.from(note)});
  }

  @Put('/edit')
  @Json() // TODO validate input and check user
  @Pre(access)
  async edit(ctx: Context) {
    const {id, title, content} = ctx.request.body;
    log.debug('Editing note', ctx.request.body);
    await this.notesRepository.update(id, {title, content});
    ctx.send(204);
  }

  @Delete('/delete/:id')
  @Pre(access) // TODO check user
  async deleteUser(ctx: Context) {
    log.debug(`Deleting note with id=${ctx.params.id}`);
    await this.notesRepository.remove(ctx.params.id);
    ctx.send(204);
  }
}
