import { Synchronizer } from "@zbigg/treesync";
import * as mocha from "mocha";

const MOCHA_SUITE_SYNCHRONIZED_PROPERTIES = [
    "title",
    "tests",
    "suites",
    "pending",
    "passes",
    "failures",
    "file",
    "delayed",
    "parent",
    "root",
    "rootEmpty",
    "duration",
    "title"
];

const MOCHA_TEST_SYNCHRONIZED_PROPERTIES = [
    "title",
    "speed",
    "body",
    "fn", // serialized as string, see below
    "type",
    "err",
    "parent",
    "title",
    "state",
    "pending",
    "skipped",
    "duration",
    "currentRetry",
    "context"
];

export function createMochaStateSynchronizer(): Synchronizer {
    const synchronizer = new Synchronizer();
    if (typeof mocha === "undefined") {
        throw new Error('mocha not loaded, cannot create Mocha Suite/Test synchronizer');
    }

    synchronizer.serializationContext.addClass({
        name: "Mocha.Suite",
        constructor: mocha.Suite as any,
        factory: function() {
            return new mocha.Suite("dummy-test");
        },
        propertyFilter: (name: string) => {
            return MOCHA_SUITE_SYNCHRONIZED_PROPERTIES.includes(name);
        }
    });

    synchronizer.serializationContext.addClass({
        name: "Mocha.Test",
        constructor: mocha.Test as any,
        factory: function() {
            return new mocha.Test("dummy-test", () => {});
        },
        propertyFilter: (name: string) => {
            return MOCHA_TEST_SYNCHRONIZED_PROPERTIES.includes(name);
        },
        propertyMapSerialize: (name: string, value: any) => {
            if (name === "fn" && typeof value === "function") {
                return value.toString();
            }
            return value;
        }
    });

    return synchronizer;
}
