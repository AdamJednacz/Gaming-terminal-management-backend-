import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { createHash, timingSafeEqual } from 'crypto';

@Injectable()
export class CryptoService {
  hash(string: string): Promise<string> {
    return bcrypt.hash(string, 10);
  }

  compare(string: string, hashedString: string): Promise<boolean> {
    return bcrypt.compare(string, hashedString);
  }

  private normalizeToken(token: unknown): string {
    if (typeof token !== 'string') {
      throw new Error('Invalid token type');
    }

    return token.trim();
  }

  hashToken(token: unknown): string {
    const normalizedToken = this.normalizeToken(token);

    return createHash('sha256').update(normalizedToken, 'utf8').digest('hex');
  }

  compareToken(token: unknown, hashedToken: string): boolean {
    if (!hashedToken) {
      return false;
    }

    const tokenHash = this.hashToken(token);

    const inputBuffer = Buffer.from(tokenHash, 'utf8');
    const storedBuffer = Buffer.from(hashedToken, 'utf8');

    if (inputBuffer.length !== storedBuffer.length) {
      return false;
    }

    return timingSafeEqual(inputBuffer, storedBuffer);
  }
}
