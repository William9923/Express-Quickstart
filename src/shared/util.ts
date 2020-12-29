import { uuid, isUuid } from "uuidv4";

export const generate = (): string => {
    return uuid();
};

export const validate = (id: string): boolean => {
    return isUuid(id);
};