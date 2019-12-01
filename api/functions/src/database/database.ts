import { MongoClient, Collection } from 'mongodb';
import { properties } from '../properties/properties';
import { log } from '../logger/log';

export class Database {

  name: string;
  client: MongoClient;

  constructor(uri: string) {
    this.name = properties.mongodb.name as string;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
    this.client = new MongoClient(uri, options);
  }

  async ensureConnected() {
    if (!this.client.isConnected()) {
      await this.connect();
    }
  }

  private async connect(): Promise<void> {
    log.info('Connecting to database...');
    await this.client.connect();
    log.info('Successfully connected to database.');
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    log.info('Disconnected from database.');
  }

  async getCollection(collection: string): Promise<Collection> {
    await this.ensureConnected();
    return this.client.db(this.name).collection(collection);
  }
}
