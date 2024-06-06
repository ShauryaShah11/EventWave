import PaymentTransactions from "../models/PaymentTransactions.js";
import Attendee from "../models/Attendee.js";
import crypto from "crypto";
import { instance } from "../index.js";

const paymentController = {
  checkout: async (req, res) => {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR"
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order
    });
  },

  paymentVerification: async (req, res) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Database comes here

      const payment = await PaymentTransactions.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        paymentStatus: "completed",
        paymentDate: new Date(),
      });

      res.json({
        success: true,
        paymentId: payment._id,
        message: "Payment transaction created successfully"
      });
    } else {
      res.status(500).json({
        success: false
      });
    }
  }
};

export default paymentController;
