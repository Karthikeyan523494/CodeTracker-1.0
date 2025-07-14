async function GotAccepted(time_taken) {
  let formatted_time = formatTime(time_taken);

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
  const { Name_Problem, Difficult, topics, date , Plateform} = GetValue();
  data.push([Name_Problem, Difficult,topics.join(', '), date, Plateform, formatted_time]);

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
