import { create } from 'zustand';
import { v4 as uuid4 } from 'uuid';

const useChatSessionStore = create((set) => ({
    sessions: {},
    currentSessionId: null,
    currentSessionInitialized: false,

    setOrDefaultCurrentSession: () => set((state) => {
        if (!state.currentSessionId) {
            const newSessionId = uuid4();
            return {
                sessions: {
                    ...state.sessions,
                    [newSessionId]: {
                        id: newSessionId,
                        messageExchanges: {},
                        activeExchange: null
                    }
                },
                currentSessionId: newSessionId,
                currentSessionInitialized: true
            };
        }
        return { ...state, currentSessionInitialized: true };
    }),

    setSession: (id) => set((state) => {
        if (!state.sessions[id]) {
            return {
                sessions: {
                    ...state.sessions,
                    [id]: {
                        id: id,
                        messageExchanges: {},
                        activeExchange: null
                    }
                }
            };
        }
        return state;
    }),

    getActiveMessageExchange: (id) => (state) => state.sessions[id]?.activeExchange || null,

    appendAnswerToActiveMessage: (id, answer) => set((state) => {
        return {
            activeExchange: {
                ...state.sessions[id].activeExchange,
                aiMessage: state.sessions[id].activeExchange.aiMessage + answer
            }
        }
    }),

    createActiveMessageExchange: (id, userMessage) => set((state) => {
        const session = state.sessions[id];
        if (session && !session.activeExchange) {
            const currentDate = new Date();
            return {
                sessions: {
                    ...state.sessions,
                    [id]: {
                        ...session,
                        activeExchange: {
                            id: uuid4(),
                            userMessage,
                            aiMessage: "",
                            userMessageDate: currentDate,
                            responseStartTime: null,
                            responseFinishTime: null,
                            lastUpdatedTime: currentDate,
                            failed: false
                        }
                    }
                }
            };
        }
        return state;
    }),

    finalizeActivateMessageExchange: (id, failed) => set((state) => {
        const session = state.sessions[id];
        if (session && session.activeExchange) {
            const currentDate = new Date();
            return {
                sessions: {
                    ...state.sessions,
                    [id]: {
                        ...session,
                        messageExchanges: {
                            ...session.messageExchanges,
                            [session.activeExchange.id]: {
                                ...session.activeExchange,
                                responseFinishTime: currentDate,
                                failed
                            }
                        },
                        activeExchange: null
                    }
                }
            };
        }
        return state;
    })
}));

export default useChatSessionStore;
