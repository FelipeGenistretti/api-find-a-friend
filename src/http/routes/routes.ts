import { FastifyInstance } from "fastify";
import { AuthController } from "../controllers/auth-controller.js";
import { OrgController } from "../controllers/org-controller.js";
import { PetController } from "../controllers/pet-controller.js";
import { verifyJwt } from "../../middlewares/verify-jwt.js";

const authController = new AuthController();
const orgController = new OrgController();
const petController = new PetController();

async function appRoutes(app: FastifyInstance) {
  app.post("/orgs", orgController.cadastrar_org); 
  app.post("/login", authController.org_login);   

  app.get("/pets/cidade", petController.list_pets_in_city); 
  app.get("/pets/filtros", petController.listar_pet_caracteristica); 
  app.get("/pets/:id", petController.get_pet_by_id);

  //
  // 🔐 Rotas privadas (ORGs autenticadas)
  //
  app.register(async (privateRoutes) => {
    privateRoutes.addHook("onRequest", verifyJwt);

    privateRoutes.post("/pets", petController.cadastrar_pet); 
  });
}

export { appRoutes }
