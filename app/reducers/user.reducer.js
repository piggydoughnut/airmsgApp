import {LOGIN_SUCCESS } from '../actions/login.actions.js'

// initial state for login is empty user details
const user = (state = [], action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                user: {
                    _id: "56ebe2c5871fc6eb9cd08bcc",
                    birthday: "2000-11-11T08:40:51.620Z",
                    gender: "male",
                    public: false,
                    username: "Michelle",
                    messages: [ /* 10 the latest messages, 10 the most active recently */
                        {
                            _id: "56cb80566e076555757888e9",
                            file: null,
                            location: {
                                city: "Prague",
                                country: "Czech Republic",
                                lat: 50.088768,
                                lng: 14.423757
                            },
                            published_at: "2014-11-11T08:40:51.620Z",
                            text: "This app is awesome! I love using it",
                            type: 1,
                            valid: 1,
                            validity: 2400000,
                            views_count: 10
                        },
                        {
                            _id: "56cb80566e07655575788811",
                            file: null,
                            location: {
                                city: "Prague",
                                country: "Czech Republic",
                                lat: 50.088768,
                                lng: 14.423757
                            },
                            published_at: "2014-11-11T08:40:51.620Z",
                            text: "Dali museum has been allright. Can't say it was amazing. If you are bored, give it a go",
                            type: 1,
                            valid: 1,
                            validity: 2400000,
                            views_count: 10
                        },
                        {
                            _id: "56cb80566e07655575788811",
                            file: null,
                            location: {
                                city: "Prague",
                                country: "Czech Republic",
                                lat: 50.088768,
                                lng: 14.423757
                            },
                            published_at: "2014-11-11T08:40:51.620Z",
                            text: "Come out party with me",
                            type: 1,
                            valid: 1,
                            validity: 2400000,
                            views_count: 10
                        }


                    ]
                },
                loggedIn: true
            };
        default:
            return state;
    }
};

export default user;
