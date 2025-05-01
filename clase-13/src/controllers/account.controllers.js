import { request, response } from "express";
import { accountService } from "../services/account.services.js";
import { errorLog } from "../utils/errorLog.js";

class AccountController {
  async depositAccount(req = request, res = response) {
    try {
      const { amount, alias, accountNumber } = req.body;
      const accountQuery = alias ? { alias } : { accountNumber };

      const account = await accountService.depositAccount(accountQuery, amount);

      res.status(201).json({ status: "ok", account });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
  async extractAccount(req = request, res = response) {
    try {
      const { amount, alias, accountNumber } = req.body;
      const accountQuery = alias ? { alias } : { accountNumber };

      const account = await accountService.extractAccount(accountQuery, amount);
      if(account.status == "error") return res.status(400).json(account);

      res.status(201).json({ status: "ok", account });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
  async transfer(req = request, res = response) {
    try {
      const { amount, alias, accountNumber, description } = req.body;
      const accountQuery = alias ? { alias } : { accountNumber };

      const accounts = await accountService.transfer(accountQuery, amount, req.user._id, description);
      if(accounts.status == "crocante") return res.status(400).json(accounts);

      res.status(201).json({ status: "ok", accounts });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async loginController(req = request, res = response) {
    try {
      const { email, password } = req.body;
      // Lógica para autenticar al usuario
      res.status(200).json({ status: "ok", msg: "Usuario autenticado" });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async registerController(req = request, res = response) {
    try {
      const { email, password, name } = req.body;
      // Lógica para registrar al usuario
      res.status(201).json({ status: "ok", msg: "Usuario registrado" });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async logoutController(req = request, res = response) {
    try {
      // Lógica para cerrar sesión
      res.status(200).json({ status: "ok", msg: "Sesión cerrada" });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }

  async profileController(req = request, res = response) {
    try {
      // Lógica para obtener el perfil del usuario
      res.status(200).json({ status: "ok", msg: "Perfil del usuario" });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}

export const accountController = new AccountController();

export const loginController = accountController.loginController.bind(accountController);
export const registerController = accountController.registerController.bind(accountController);
export const logoutController = accountController.logoutController.bind(accountController);
export const profileController = accountController.profileController.bind(accountController);
