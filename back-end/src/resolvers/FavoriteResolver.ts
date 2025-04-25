
import {
    Arg,
    Args,
    ArgsType,
    Field,
    Float,
    Ctx,
    ID,
    InputType,
    Mutation,
    Query,
    Resolver,
    registerEnumType,
    createMethodDecorator
  } from "type-graphql";
  
  
  @Resolver()
export class FavoriteResolver {
  // @Query(() => [Ad])
  // getAds() {
  //   return Ad.getAds();

  // @Mutation(() => Ad)
  // createAd(@Args() args: editOrCreateAd) {
  //   return Ad.createAd(args);
  // }
}
