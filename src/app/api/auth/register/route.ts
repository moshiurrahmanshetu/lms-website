import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    console.log('[REGISTER API] Starting registration...');
    const body = await request.json();
    const { name, email, password } = body;

    console.log('[REGISTER API] Received data:', { name, email, passwordLength: password?.length });

    // Validate input
    if (!name || !email || !password) {
      console.log('[REGISTER API] Validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    console.log('[REGISTER API] Checking for existing user with email:', email);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('[REGISTER API] User already exists with email:', email);
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('[REGISTER API] Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[REGISTER API] Password hashed successfully, hash length:', hashedPassword.length);
    console.log('[REGISTER API] Hash preview:', hashedPassword.substring(0, 20) + '...');

    // Create user
    console.log('[REGISTER API] Creating user in database with data:', {
      name,
      email,
      passwordLength: hashedPassword.length,
      role: 'STUDENT'
    });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'STUDENT',
      },
    });

    console.log('[REGISTER API] User created successfully:', { id: user.id, email: user.email, name: user.name });

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[REGISTER API] Registration error occurred');
    console.error('[REGISTER API] Error object:', error);
    
    if (error instanceof Error) {
      console.error('[REGISTER API] Error name:', error.name);
      console.error('[REGISTER API] Error message:', error.message);
      console.error('[REGISTER API] Error stack:', error.stack);
      
      // Check for Prisma-specific errors
      if ('code' in error) {
        console.error('[REGISTER API] Prisma error code:', (error as any).code);
        console.error('[REGISTER API] Prisma meta:', (error as any).meta);
      }

      // Return actual error message to client
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.error('[REGISTER API] Unknown error type');
    return NextResponse.json(
      { error: 'An unknown error occurred during registration' },
      { status: 500 }
    );
  }
}
