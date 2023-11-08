import { faker } from "@faker-js/faker";

export default function getCardData(size) {
  const data = [];

  for (let i = 0; i < size; i++) {
    data.push({
      title: faker.lorem.sentence(10),
      client: faker.person.fullName(),
      pm: "Dinar M Islam",
      deliverables: "Deliverables",
      task: "Taking screenshot and changing names etc to do a quick mockup"
    });
  }

  return data;
}