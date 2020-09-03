// for example, this can be checkout button on the final step of an order form, let's name it like
// final-step.component.ts
// checkout()
// {
//   const dialogRef = this.dialog.open(StripePaymentComponent, {
//     // opening dialog here which will give us back stripeToken
//     data: {totalAmount: this.getTotal()},
//   });
//   dialogRef.afterClosed()
//     // waiting for stripe token that will be given back
//     .subscribe((result: any) =>
//     {
//       if (result) {
//         this.createOrder(result.token.id);
//       }
//     });
// }
