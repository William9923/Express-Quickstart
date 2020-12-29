import * as shell from "shelljs";

shell.mkdir("-p", "dist/public/css");
shell.mkdir("-p", "dist/public/fonts");
shell.mkdir("-p", "dist/public/img");
shell.mkdir("-p", "dist/public/js");

shell.cp("-R", "src/public/js", "dist/public/");
shell.cp("-R", "src/public/fonts", "dist/public/");
shell.cp("-R", "src/public/img", "dist/public/");
shell.cp("-R", "src/public/css", "dist/public/");