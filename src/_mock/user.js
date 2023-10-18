import { faker } from "@faker-js/faker/locale/es";
import { sample } from "lodash";

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatar: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  firstname: faker.name.fullName(),
  lastname: faker.company.name(),
  email: faker.datatype.boolean(),
  role: sample(["activo", "inactivo"]),
  status: sample(["activo", "inactivo"]),
}));

export default users;
