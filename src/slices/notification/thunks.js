import { isLoadingNotification, listarNotification, setNotification } from './notificationSlice'
import { dashAxios } from '../../config/dashAxios';

export const getNotifications = () => {
    return async (dispatch, getState) => {
        dispatch(isLoadingNotification());

        const { data } = await dashAxios.get('notifications/list');
        console.log(data.notificationData)
        dispatch( listarNotification({
                    notification: data.notificationData
                }));
    }
}

export const createNotification = (notification) => {
    console.log(notification, 'notification')
    return async (dispatch, getstate) => {
        dispatch(isLoadingNotification());

        const { data } = await dashAxios.post('notification', { notification })
        console.log(data.notificationData, 'data');


        dispatch(setNotification({
            notification: data.notificationData
        }));

    }
}
