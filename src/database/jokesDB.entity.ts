import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Jokes {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  chatId: number;

  @Column()
  joke: string;
}
