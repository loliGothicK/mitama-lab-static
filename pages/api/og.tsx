import { ImageResponse, NextRequest } from 'next/server';
export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            backgroundColor: 'rgb(55,65,81)',
            fontWeight: 600,
            padding: 60,
            border: '48px solid rgb(31,41,55)',
          }}
        >
          <div style={{ color: '#fff', fontSize: 64, maxWidth: 1000 }}>{title}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between'  }}>
            <div style={{ color: '#d1d5db', fontSize: 28, display: 'flex', alignItems: 'center' }}>
              <img
                src="https://raw.githubusercontent.com/LoliGothick/mitama-lab-static/main/public/AMiMA.png"
                width={60}
                height={60}
                style={{ borderRadius: 9999, marginRight: 20 }}
                alt={'logo'}
              />
              {'Mitama Lab.'}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
