const button = document.createElement("button");
button.id = "overlay-button";
document.body.appendChild(button);

let isDragging = false;
let offsetX, offsetY;

button.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - button.getBoundingClientRect().left;
  offsetY = e.clientY - button.getBoundingClientRect().top;
  button.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  button.style.left = `${e.clientX - offsetX}px`;
  button.style.top = `${e.clientY - offsetY}px`;
  button.style.right = "auto";
  button.style.bottom = "auto";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  button.style.cursor = "grab";
});

async function insertheader() {
  const handle = await getFileHandle();
  if (!handle) return alert('No file handle stored.');

  // Check for write permission
  const hasPermission = await verifyPermission(handle, true);
  if (!hasPermission) return alert('Permission denied.');

  // Read the file
  const file = await handle.getFile();
  const arrayBuffer = await file.arrayBuffer();

  // Parse the workbook
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  // Get existing sheet or create new one
  const sheetName = workbook.SheetNames[0] || "Sheet1";
  let sheet = workbook.Sheets[sheetName] || XLSX.utils.aoa_to_sheet([]);

  // Convert to array of arrays
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Extract data
  data.push(["Problem Name", "Difficulty", "Topics", "Date", "Platform", "Time Taken"]);

  // Convert updated data back to sheet
  const updatedSheet = XLSX.utils.aoa_to_sheet(data);
  workbook.Sheets[sheetName] = updatedSheet;

  // Write updated workbook
  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const writable = await handle.createWritable();
  await writable.write(wbout);
  await writable.close();

  alert("Problem data successfully appended to Excel!");
}

document.getElementById('overlay-button').addEventListener('click', async () => {
  const [handle] = await window.showOpenFilePicker({
    types: [{
      description: 'Excel Files',
      accept: {
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/vnd.ms-excel': ['.xls']
      }
    }]
  });
  if (await verifyPermission(handle, true)) {
    await storeFileHandle(handle);
    alert('File handle stored successfully!');
  } else {
    alert('Permission not granted.');
  }
  insertheader();
});

async function verifyPermission(handle, withWrite) {
  const opts = withWrite ? { mode: 'readwrite' } : {};
  if ((await handle.queryPermission(opts)) === 'granted') return true;
  if ((await handle.requestPermission(opts)) === 'granted') return true;
  return false;
}