// import { createContext, FC, ReactNode, useState } from 'react';
// import WorkFlow from '../../../Common/Services/WorkFlowService';
// import {
//   TransNotificationCreateModel,
//   TransNotificationsModel,
// } from '../Models/TransNotificationsModel';

// // Helper functions

// const fetchAllNotifications = async (
//   wflGuid: string,
//   transitionId: number
// ): Promise<TransNotificationsModel[]> => {
//   const notifications = await WorkFlow.GetTransitionNotifications(
//     wflGuid,
//     transitionId
//   );

//   const result = notifications.result;

//   return result;
// };

// const fetchCurrentNotificationDetail = async (
//   wflGuid: string,
//   transitionId: number,
//   idNotif: number
// ): Promise<TransNotificationsModel> => {
//   const notification = await WorkFlow.GetTransitionNotificationDetail(
//     wflGuid,
//     transitionId,
//     idNotif
//   );

//   const result = notification.result;

//   return result;
// };

// const createTransitionNotification = async (
//   wflGuid: string,
//   transitionId: number,
//   model: TransNotificationCreateModel
// ): Promise<void> => {
//   return WorkFlow.CreateTransitionNotifications(wflGuid, transitionId, model);
// };

// const updateCurrentTransitionNotification = (
//   wflGuid: string,
//   transitionId: number,
//   idNotif: number,
//   model: TransNotificationCreateModel
// ): Promise<void> => {
//   return WorkFlow.UpdateTransitionNotificationDetail(
//     wflGuid,
//     transitionId,
//     idNotif,
//     model
//   );
// };

// interface TransitionNotificationContextProps {
//   notifications: TransNotificationsModel[];
//   fetchNotifications: (wflGuid: string, transitionId: number) => Promise<void>;
//   currentNotification: TransNotificationsModel | null;
//   fetchCurrentNotification: (
//     wflGuid: string,
//     transitionId: number,
//     idNotif: number
//   ) => Promise<void>;
//   createNotification: (
//     wflGuid: string,
//     transitionId: number,
//     model: TransNotificationCreateModel
//   ) => Promise<void>;
//   updateCurrentNotification: (
//     wflGuid: string,
//     transitionId: number,
//     idNotif: number,
//     model: TransNotificationCreateModel
//   ) => Promise<void>;
// }

// export const TransitionNotificationContext =
//   createContext<TransitionNotificationContextProps | null>(null);

// export const TransitionNotificationProvider: FC<ReactNode> = ({ children }) => {
//   const [notifications, setNotifications] = useState<TransNotificationsModel[]>(
//     []
//   );
//   const [currentNotification, setCurrentNotification] =
//     useState<TransNotificationsModel | null>(null);

//   const fetchNotifications = async (
//     wflGuid: string,
//     transitionId: number
//   ): Promise<void> => {
//     const fetchedNotifications = await fetchAllNotifications(
//       wflGuid,
//       transitionId
//     );
//     setNotifications(fetchedNotifications);
//   };

//   const fetchCurrentNotification = async (
//     wflGuid: string,
//     transitionId: number,
//     idNotif: number
//   ): Promise<void> => {
//     const fetchedNotification = await fetchCurrentNotificationDetail(
//       wflGuid,
//       transitionId,
//       idNotif
//     );
//     setCurrentNotification(fetchedNotification);
//   };

//   const createNotification = async (
//     wflGuid: string,
//     transitionId: number,
//     model: TransNotificationCreateModel
//   ): Promise<void> => {
//     createTransitionNotification(wflGuid, transitionId, model);
//   };

//   const updateCurrentNotification = async (
//     wflGuid: string,
//     transitionId: number,
//     idNotif: number,
//     model: TransNotificationCreateModel
//   ): Promise<void> => {
//     updateCurrentTransitionNotification(wflGuid, transitionId, idNotif, model);
//   };

//   const value = {
//     fetchNotifications,
//     fetchCurrentNotification,
//     notifications,
//     currentNotification,
//     createNotification,
//     updateCurrentNotification,
//   };

//   return (
//     <TransitionNotificationContext.Provider value={value}>
//       {children}
//     </TransitionNotificationContext.Provider>
//   );
// };