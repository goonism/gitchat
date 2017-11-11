import "babel-polyfill";
import GitHub from 'github-api';

export default class Gitchat {

  constructor(username, password, repo) {
    this.gh = new GitHub({username,password});
    this.repo = this.gh.getRepo(username, repo);
  }

  async getAllCommits(branch) {
    const options = {
      sha: branch
    };
    return (await this.repo.listCommits(options)).data;
  }

  async getAllCommitMessages(branch) {
    const commits = await this.getAllCommits(branch);
    const commitMessages = commits.map((commitObject) => commitObject.commit.message);
    return commitMessages;
  }

  async getAllBranches() {
    (await this.repo.listBranches()).data;
  }

  async getBranch(branchName) {
    (await this.repo.getBranch(branchName)).data;
  }

  async commit(branchName, message) {
    const options = {
      shouldEncode: false
    };
    return await this.repo.writeFile(branchName, 'README.md', '', message, options);
  };

  async sendChatMessage(channelName, message) {
    return await this.commit(channelName, message);
  }

  async getMessagesFromChannel(channelName) {
    return await this.getAllCommitMessages(channelName);
  }
}
