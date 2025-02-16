import Booking from "../entities/booking";
import {
  Resolver,
  ArgsType,
  Field,
  Mutation,
  Args,
  Query,
  Arg,
  ID,
} from "type-graphql";
import { stripe } from "../stripe";
import Payment from "../entities/payment";
@ArgsType()
export class CreateOrUpdateBooking {
  @Field()
  checkinDate!: Date;

  @Field()
  checkoutDate!: Date;

  @Field()
  totalPrice!: number;

  @Field()
  statusPayment!: boolean;

  @Field()
  adId!: string;

  @Field()
  userId!: string;
}

@Resolver()
export class BookingResolver {
  @Mutation(() => Booking)
  createBooking(@Args() args: CreateOrUpdateBooking) {
    return Booking.saveNewBooking(args);
  }

  @Query(() => [Booking])
  getBookings() {
    return Booking.getBookings();
  }
  @Query(() => Booking)
  getBooking(@Arg("id") id: string) {
    return Booking.getBooking(id);
  }

  @Query(() => [Booking])
  getBookingsByAds(@Arg("id") id: string) {
    return Booking.getBookingsByAd(id);
  }

  @Query(() => [Booking])
  getBookingsByHost(@Arg("userId", () => ID) userId: string) {
    return Booking.getBookingsByHost(userId);
  }

  @Query(() => [Booking])
  getBookingsByTraveller(@Arg("userId", () => ID) userId: string) {
    return Booking.getBookingsByTraveller(userId);
  }


  //this function uses some info found in the user checkout session (like if the session is completed and the payment was successful) 
  //and returns all the  successfully booked reservations
//   @Query(() => [String])
//   @Query(() => [String])
// async getSucceededBookings(@Arg("userId") userId: string): Promise<string[]> {
//   try {
//     const payments = await Payment.find({ where: { user: { id: userId } } });
//     const succeededBookings: Booking[] = [];

//     for (const payment of payments) {
//       const checkoutSessionId = payment.stripeCheckoutSessionId;

//       if (!checkoutSessionId) {
//         continue;
//       }

//       try {
//         // stripe.checkout.sessions.retrieve is a native function in stripe
//         const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

//         if (session.payment_status === "paid") {
//           const booking = await Booking.getBooking(payment.booking.id); 
//           if (booking) {
//             succeededBookings.push(booking);
//           }
//         }
//       } catch (error) {
//         console.error("Error retrieving checkout session", error);
//       }
//     }

//     return succeededBookings;
//   } catch (error) {
//     console.error("Error retrieving succeeded bookings:", error);
//     throw new Error("Failed to retrieve succeeded bookings");
//   }
// }


@Query(() => [Booking]) // Change return type to Booking
async getSucceededBookings(@Arg("userId") userId: string): Promise<Booking[]> {
  try {
    const payments = await Payment.find({ where: { user: { id: userId } } });
    const succeededBookings: Booking[] = []; // Change array type to Booking

    for (const payment of payments) {
      const checkoutSessionId = payment.stripeCheckoutSessionId;

      if (!checkoutSessionId) {
        continue;
      }

      try {

        const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);

        if (session.payment_status === "paid") {
          // Fetch the full booking object using the booking ID
          const booking = await Booking.getBooking(payment.booking.id); 
          if (booking) {
            succeededBookings.push(booking);
          }
        }
      } catch (error) {
        console.error("Error retrieving checkout session", error);
      }
    }

    return succeededBookings;
  } catch (error) {
    console.error("Error retrieving succeeded bookings:", error);
    throw new Error("Failed to retrieve succeeded bookings");
  }
}

}
