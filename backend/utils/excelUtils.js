// backend/utils/excelUtils.js

const excel = require('exceljs');

// Function to generate and download Excel file with post information
function generateExcel(posts) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Posts');

    // Define column headers
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 10 },
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Company', key: 'company', width: 20 },
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Body', key: 'body', width: 50 }
    ];

    // Add rows for each post
    posts.forEach(post => {
        worksheet.addRow(post);
    });

    // Set response headers for file download
    const fileName = 'posts.xlsx';
    const filePath = `temp/${fileName}`;

    workbook.xlsx.writeFile(filePath).then(() => {
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.download(filePath, fileName, (error) => {
            if (error) {
                console.error('Error downloading Excel file:', error);
            }
        });
    });
}

// Export the function for generating Excel files
module.exports = {
    generateExcel
};
