import PubNub from 'pubnub';

const { REACT_APP_PUBNUB_PUBLISH_KEY, REACT_APP_PUBNUB_SUBSCRIBE_KEY } = process.env;

let pubnub;

if (REACT_APP_PUBNUB_PUBLISH_KEY || REACT_APP_PUBNUB_SUBSCRIBE_KEY ) {
  pubnub = new PubNub({
    publishKey: REACT_APP_PUBNUB_PUBLISH_KEY,
    subscribeKey: REACT_APP_PUBNUB_SUBSCRIBE_KEY
  });
}

export { pubnub };
