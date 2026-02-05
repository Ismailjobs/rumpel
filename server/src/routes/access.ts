import { Router, Request, Response } from "express";
import { IpBan, getBanDurationMs } from "../models/IpBan.js";

const router = Router();

const ALLOWED_HOSTS = ["objektraeumung.at", "www.objektraeumung.at"];
const IPV4_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const IPV6_REGEX = /^\[?([0-9a-fA-F:]+)\]?$/;

function isIp(host: string): boolean {
  const withoutPort = host.split(":")[0];
  return IPV4_REGEX.test(withoutPort) || IPV6_REGEX.test(withoutPort);
}

function getHostWithoutPort(host: string): string {
  return host.split(":")[0].toLowerCase();
}

function isHostAllowed(host: string): boolean {
  const h = getHostWithoutPort(host);
  return ALLOWED_HOSTS.includes(h);
}

/** GET /api/access-check?ip=...&host=... - Called by Next.js middleware. Returns { allowed: boolean }. */
router.get("/access-check", async (req: Request, res: Response) => {
  try {
    const ip = typeof req.query.ip === "string" ? req.query.ip.trim() : "";
    const host = typeof req.query.host === "string" ? req.query.host.trim() : "";

    if (!ip) {
      return res.json({ allowed: true });
    }

    const now = new Date();

    const existing = await IpBan.findOne({ ip });
    if (existing && existing.bannedUntil > now) {
      return res.json({ allowed: false });
    }

    if (!isHostAllowed(host) || isIp(host)) {
      const bannedUntil = new Date(now.getTime() + getBanDurationMs());
      await IpBan.findOneAndUpdate(
        { ip },
        { $set: { bannedUntil }, $setOnInsert: { createdAt: now } },
        { upsert: true, new: true }
      );
      return res.json({ allowed: false });
    }

    res.json({ allowed: true });
  } catch (err) {
    console.error("[access-check]", err);
    res.status(500).json({ allowed: true });
  }
});

export const accessRouter = router;
