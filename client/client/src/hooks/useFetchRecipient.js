import { useEffect, useState } from "react";
import { getRequest } from "../utils/services";
import { baseUrl } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const recipientId = chat?.members.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
            if (response.error) {
                setError(response.error);
            } else {
                setRecipientUser(response);
            }
            setLoading(false);
        };
        
        getUser();
    }, [recipientId]);

    return { recipientUser, loading, error };
};
