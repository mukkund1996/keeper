const noteKeeperHostIp = process.env.NOTEKEEPER_HOSTIP || "localhost";
const noteKeeperPort = process.env.NOTEKEEPER_PORT || 4000;

const noteKeeperUri = `http://${noteKeeperHostIp}:${noteKeeperPort}/api/v1/`;

export default noteKeeperUri;