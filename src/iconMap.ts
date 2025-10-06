import { MdOutlineMail, MdPhone, MdOutlineWhatsapp, MdOutlineFacebook } from "react-icons/md";
import { BsInstagram, BsTwitterX, BsYoutube, BsPersonX } from "react-icons/bs";
import { BiShoppingBag, BiUserCircle } from "react-icons/bi";
import { FaMoneyBillTransfer, FaCreditCard } from "react-icons/fa6";

export const accountIconMap = {
  profile: BiUserCircle,
  shoppingBag: BiShoppingBag,
  profileDelete: BsPersonX,
};

export const footerIconMap = {
  email: MdOutlineMail,
  phone: MdPhone,
  whatsApp: MdOutlineWhatsapp,
  facebook: MdOutlineFacebook,
  instagram: BsInstagram,
  x: BsTwitterX,
  youtube: BsYoutube,
};

export const monnifyPaymentIconMap = {
  bankTransfer: FaMoneyBillTransfer,
  creditCard: FaCreditCard,
};
