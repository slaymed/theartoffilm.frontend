import { socket } from "../App";

import { registerSocket } from "../store/auth/thunks";
import { fetchCart } from "../store/cart/thunks";
import { fetchChatListObject } from "../store/chat/thnuks";
import { fetchMyGifts } from "../store/gifts/thunks";
import { fetchOrders } from "../store/orders/thunks";
import { fetchCreditCards } from "../store/payment-methods/thunks";
import { fetchMyProducts } from "../store/products/thunks";
import { fetchCurrentSubscription } from "../store/subscription/thunks";
import { fetchWithdrawRequests } from "../store/withdraw-requests/thunks";

export const loadUserRelated = async (dispatch: any) => {
    dispatch(fetchCart());
    dispatch(fetchOrders());
    dispatch(fetchMyProducts());
    dispatch(fetchChatListObject());
    dispatch(fetchCreditCards());
    dispatch(fetchCurrentSubscription());
    dispatch(fetchWithdrawRequests());
    dispatch(fetchMyGifts());

    const x = setInterval(() => {
        if (socket.id) {
            dispatch(registerSocket());
            clearInterval(x);
        }
    }, 1000);
};
