import { ObjectType, Field, ID, Float } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Like,
  ILike,
  ManyToOne,
} from "typeorm";

import User from "./user";

@Entity()
@ObjectType()
class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id!: string;

  // @ManyToOne(() => User, (user) => user.favorites)
  // @Field(() => User)
  // user!: User;


    // @OneToMany(() => Ad, (ad) => ad.user_favorite)
    // @Field(() => [Ad])
    // ads!: Ad[];
}

export default Favorite; 