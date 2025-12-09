import { exec } from "child_process";
import path from "path";

// ---------- SAFE JSON EXEC FUNCTION ----------
function runPython(pyFile: string, payloadObj: any) {
  const payload = JSON.stringify(payloadObj).replace(/"/g, '\\"');

  const command = `python3 "${pyFile}" "${payload}"`;

  console.log("Executing:", command);

  exec(command, (err, stdout, stderr) => {
    if (err) console.log("PY ERROR:", err);
    if (stderr) console.log("PY STDERR:", stderr);
    if (stdout) console.log("PY OUT:", stdout);
  });
}


// ---------- FINAL REPORT ----------
export function pythonCreateReport() {
  const py = path.join(process.cwd(), "utils/word.py");

  runPython(py, { action: "final" });
}
