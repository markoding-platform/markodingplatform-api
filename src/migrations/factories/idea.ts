import Faker from "faker";
import { define } from "typeorm-seeding";

import { Idea } from "../../api/entity";

define(Idea, (faker: typeof Faker) => {
  const idea = new Idea();
  idea.schoolId = faker.random.uuid();
  idea.teacherId = faker.random.uuid();
  idea.solutionName = faker.random.words();
  idea.solutionType = "web";
  idea.problemArea = faker.lorem.sentence();
  idea.problemSelection = faker.lorem.paragraph();
  idea.problemReasoning = faker.lorem.paragraphs();
  idea.solutionVision = faker.lorem.paragraph();
  idea.solutionMission = faker.lorem.paragraphs();
  idea.solutionBenefit = faker.lorem.paragraphs();
  idea.solutionObstacle = faker.lorem.paragraph();
  idea.solutionPitchUrl = faker.internet.url();
  idea.targetOutcomes = faker.lorem.text();
  idea.targetCustomer = faker.lorem.lines();
  idea.potentialCollaboration = faker.lorem.lines();
  idea.solutionSupportingPhotos = [
    faker.internet.avatar(),
    faker.internet.avatar(),
    faker.internet.avatar(),
  ];
  idea.isDraft = true;

  return idea;
});
