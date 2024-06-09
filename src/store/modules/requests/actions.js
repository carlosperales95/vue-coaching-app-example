export default {
    async contactCoach(context, payload) {
        const newReq = {
            // coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        };

        const response = fetch(
        `https://vue-coaches-db-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
        {
            method: 'POST',
            body: JSON.stringify(newReq)
        });

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to send req');
            throw error;
        }

        const responseData = await response.json();

        context.commit('addRequest', {
            ...newReq,
            id: responseData.name,
            coachId: payload.coachId
        });
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(
            `https://vue-coaches-db-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json`,
        );
        const responseData = await response.json();

        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch requests');
            throw error;
        }

        const requests = [];
        for(const key in responseData) {
            const req = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message,
            };
            requests.push(req);
        }
        context.commit('setRequests', requests);
    }
};