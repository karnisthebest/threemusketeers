import {Deserializable} from "./deserializable.model";
import {ICoupon} from "./Coupon.model";

export interface IOrder {
    OrderId: string;
    receiverName: string;
    receiverAddress: string;
    receiverCity: string;
    receiverCountry: string;
    receiverZipCode: string;
    orderReMark: string;
    orderWeight: string;
    orderPrice: string;
    orderTimes: string;
    orderIsPaid: boolean;
    orderPaidTimes: string;
    orderIsCanceled: boolean;
    orderTrackerNo: string;
    orderMerchandiseList: string;
    canBeEdited: boolean;
    isDone: boolean;
    lastUpdatedTimes: string;
    distributorRef: string;
    statustRef: string;
    identityId: string;
    employeeRef: string;
    couponRef: string;
    coupon: ICoupon;
  }