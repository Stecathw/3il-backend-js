"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContactById = exports.getAllContacts = void 0;
const prismaRepository_1 = require("../repository/prismaRepository");
const getAllContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaRepository_1.prismaRepository.getAllContacts();
});
exports.getAllContacts = getAllContacts;
const getContactById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaRepository_1.prismaRepository.getContactById(id);
});
exports.getContactById = getContactById;
const createContact = (contactInput) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaRepository_1.prismaRepository.createContact(Object.assign({}, contactInput));
});
exports.createContact = createContact;
const updateContact = (id, contactInput) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaRepository_1.prismaRepository.updateContact(id, Object.assign({}, contactInput));
});
exports.updateContact = updateContact;
const deleteContact = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaRepository_1.prismaRepository.deleteContact(id);
    return true;
});
exports.deleteContact = deleteContact;
