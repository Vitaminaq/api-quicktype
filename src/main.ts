import { yapi } from './yapi';
import { swagger } from './swagger';
import { getConfig } from './utils/utils';

export default async () => {
    const { platform } = await getConfig();

    switch (platform) {
        case 'yapi':
            yapi();
            break;
        case 'swagger':
            swagger();
            break;
    }
}
