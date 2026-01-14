let dispatch;

export const injectDispatch = (_dispatch) => {
    dispatch = _dispatch;
};

export const getDispatch = () => {
    if (!dispatch) {
        throw new Error("Dispatch has not been injected yet");
    }
    return dispatch;
};