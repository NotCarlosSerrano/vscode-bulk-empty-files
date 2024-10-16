import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

const validExmaples = [
    "[hola adios, hola-test.txt, otro_archivo]",
    "[file_1, file-2]",
    "[hello.world, test-file.txt]",
    "[file.name.with.multiple.extensions]",
    "[archivo.sin.extension, archivo_con-extension]",
    "[uno, dos.tres.cuatro]",
    "[file1, file2]",
    "[example_file].tar.gz",
    "[test-file, another.file].a.b.c",
    "[file.name.with.multiple.extensions].py2",
    "[file.name.with.multiples.extensiones, file2.name]",
    "[file1.py, file2.txt, file3.doc]",
    "[multi.part.file.name.with.ext, another_file.without_ext]",
	"[hidden.file, another.hidden.file]",
    "[file.with.dots, file.without.dots]",
    "[file_with_special_chars_@!$, another_file_with_special_chars_#%&]",
    "[first_file_v1.0, second_file_v2.0]",
    "[nested/file.name, sub.folder/file2.name]",
    "[file_with_multiple.extensions, file.with.several.parts]",
    "[long_file_name_with_a_really_long_description_and_more_than_one_part.txt, another.file.ext]",
    "[0_starting_number.file1, 1_starting_number.file2]",
    "[space at end , trailing_space ]",
    "[exotic-characters_éèêë, unicode_文件.txt]",
    "[non_ascii_ß_äöü, another_file_çñ]",
    "[single_word, another.word, file_with.many.dots.extension]",
    "[a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p.q.r.s.t.u.v.w.x.y.z.txt]"
];

const invalidExamples = [
    "[file1, file2].",  // Punto sin caracteres después
    "[example_file].",   // Punto sin caracteres después
    "[file.name.with.multiple.extensions].",  // Punto al final sin caracteres después
    "[file1, file2].",  // Punto sin caracteres después
    "[hello.world, test-file.]",  // Punto sin caracteres después
    "[valid_file, invalid_file.]",
    "[.hidden_file]", // Puntos al inicio sin caracteres válidos
    "[file1, file2]..py", // Doble punto final no permitido
    "[.leading_dot_file]", // Punto al inicio sin caracteres válidos
    "[invalid_file.]",  // Punto sin caracteres después
    "[file.with..consecutive.dots]",  // Puntos consecutivos sin caracteres entre ellos
    "[file1, file2.] ",  // Punto al final sin caracteres después
    "[another.hidden.file.]", // Punto al final sin caracteres después
    "[space at start, invalid_name. ]", // Espacio al inicio del nombre
    "[file_without_name., another_file]", // Punto sin caracteres después
    "[file_without_extension. , invalid_file ]", // Punto sin caracteres después
    "[file1, file2].py." // Doble punto final no permitido
];


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	// Get regex variable from extension.ts
	const regex = new RegExp(vscode.extensions.getExtension('josegpt.create-empty-files')?.packageJSON.contributes.commands[0].regex);
	console.log(regex);

	test('Valid examples', () => {
		validExmaples.forEach(example => {
			assert.ok(regex.test(example));
		});
	});
});
