import * as chai from "chai";
import { Parser } from "../src/parser";
import { Lexer } from "../src/lexer";
import { Term } from "../src/ast";
import hashTerm from "../src/termhasher";
import Logger, { Verbosity } from "../src/logger";

const expect = chai.expect;

const logger: Logger = new Logger({ output_stream: process.stdout, verbosity: Verbosity.NONE });

describe("Term hasher tests", () => {
    function genTerm(source: string): Term {
        return new Parser(new Lexer(source, logger).lexTokens(), logger).parseTerm();
    }
    function hash(source: string): number {
        const h = hashTerm(genTerm(source));
        console.log(`${source} -> ${h}`);
        return h;
    }
    it("Basic equivalence test", () => {
        expect(hash("(Lx.x)")).to.equal(hash("(Lx.x)"));
        expect(hash("Lx.x")).to.equal(hash("Lx.x"));
        expect(hash("Lx.x")).to.equal(hash("Ly.y"));
        expect(hash("Lx y. x y")).to.equal(hash("Ly x. y x"))
    });
});
