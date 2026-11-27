import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Пока флаги живут в файле. Когда будет схема Prisma — перенесём в таблицу,
// а API останется тем же, панель трогать не придётся.
const FLAGS_PATH = path.join(process.cwd(), "src/avva/flags/flags.json");

const KNOWN_FLAGS = ["registration", "shop", "messages", "paidAccess"];

async function readFlags() {
  const raw = await fs.readFile(FLAGS_PATH, "utf-8");
  return JSON.parse(raw);
}

export async function GET() {
  try {
    const flags = await readFlags();
    return NextResponse.json({ flags });
  } catch {
    return NextResponse.json(
      { error: "Не удалось прочитать флаги" },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    const { key, value } = await request.json();

    if (!KNOWN_FLAGS.includes(key)) {
      return NextResponse.json({ error: "Неизвестный флаг" }, { status: 400 });
    }
    if (typeof value !== "boolean") {
      return NextResponse.json(
        { error: "Значение должно быть true/false" },
        { status: 400 },
      );
    }

    const flags = await readFlags();
    flags[key] = value;
    await fs.writeFile(FLAGS_PATH, JSON.stringify(flags, null, 2), "utf-8");

    return NextResponse.json({ flags });
  } catch {
    return NextResponse.json(
      { error: "Не удалось сохранить флаг" },
      { status: 500 },
    );
  }
}
