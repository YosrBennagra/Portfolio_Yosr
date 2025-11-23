import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'assets', 'reports', 'pfe-report.pdf');

  try {
    const file = await fs.readFile(filePath);
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="pfe-report.pdf"'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Report not found' }, { status: 404 });
  }
}
