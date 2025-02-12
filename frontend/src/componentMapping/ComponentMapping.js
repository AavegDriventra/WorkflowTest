import { lazy } from 'react';

// Dynamically import components
const ComponentMapping = {
  TicketStatusChanged: lazy(() => import('../components/TicketStatusChanged')),
  ContactCreated: lazy(() => import('../components/ContactCreated')),
  ContactUpdated: lazy(() => import('../components/ContactUpdated')),
};

export default ComponentMapping;
