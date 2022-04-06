const api_host = process.env.REACT_APP_NOTEKEEPER_HOSTIP || "notekeeper";
const api_port = process.env.REACT_APP_NOTEKEEPER_DOCKER_PORT || 4000
const noteKeeperUri = `http://${api_host}:${api_port}/api/v1/`;
export default noteKeeperUri;