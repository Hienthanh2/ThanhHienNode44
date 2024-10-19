import { expect } from "chai";
import initModels from "../../../src/models/init-models.js";
import sequelize from "../../../src/models/connect.js";
import sinon from "sinon";
import { getListVideos } from "../../controllers/video.controller.js";
const model = initModels(sequelize);

describe("get videos", () => {
  // Test cases for happy and failed cases
  let req, res, findAllStub; // mock find all video

  beforeEach(() => {
    // simulate req and res object
    req = {};

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // simulate findAllVideo
    findAllStub = sinon.stub(model.video, "findAll");
  });

  // restore setting after test cases
  afterEach(() => {
    sinon.restore();
  });

  it("Return 200 and list of videos", async () => {
    const videos = [
      {
        video_id: 1,
        video_name: "Introduction to Coding",
        thumbnail: "deadpool.jpg",
        description: "Learn the basics of coding",
        views: 1500,
        source: "youtube.com",
        user_id: 1,
        type_id: 2,
      },
    ];

    findAllStub.resolves(videos);

    await getListVideos(req, res);

    // check response and status to be called 200
    expect(res.status.calledWith(200)).to.be.true;

    expect(res.json.calledWith(videos)).to.be.true;
  });
});
