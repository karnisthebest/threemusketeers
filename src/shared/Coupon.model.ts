import { Deserializable } from "./deserializable.model";


export interface ICoupon{
    CouponId: string;
    CouponDiscount: Number;
    CouponCanBeUseTimes: Number;
    CouponUsedCount: Number;
}