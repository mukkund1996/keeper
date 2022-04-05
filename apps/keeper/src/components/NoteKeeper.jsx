const noteKeeperHostIp = process.env.NOTEKEEPER_HOSTIP;
const noteKeeperPort = process.env.NOTEKEEPER_DOCKER_PORT;

const noteKeeperUri = `http://${noteKeeperHostIp}:${noteKeeperPort}/api/v1/`;

export default noteKeeperUri;