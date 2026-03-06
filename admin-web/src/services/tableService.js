import { apiFetch } from '../utils/api';

export const tableService = {
  endSession: (tableId) =>
    apiFetch(`/api/admin/tables/${tableId}/session/end`, { method: 'POST' }),
  getHistory: (tableId, params = {}) => {
    const query = new URLSearchParams();
    if (params.dateFrom) query.set('date_from', params.dateFrom);
    if (params.dateTo) query.set('date_to', params.dateTo);
    if (params.cursor) query.set('cursor', params.cursor);
    return apiFetch(`/api/admin/tables/${tableId}/history?${query}`);
  },
};
