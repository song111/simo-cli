import webpack from 'webpack';
import { logger, fs } from '@chrissong/simo-utils';
import _ from 'lodash';
import path from 'path';

import { OptionType } from '../../type';
import Api from '../api';
import { formatStats } from '../utils';

export default async (options: OptionType) => {
  const api = new Api('production', options);
  const config: any = await api.resolveWebpackConfig();

  return new Promise<any>((resolve, reject) => {
    webpack(config, (error, stats) => {
      if (error || !stats) return reject(error);

      if (error || stats.compilation.errors.length) {
        logger.log(stats.toString({ colors: true, all: false, errors: true, warnings: true }));
        process.exit(1);
      } else {
        logger.log(stats.toString({ colors: true, all: false, errors: true, warnings: true }));
        logger.log(formatStats(stats, _.get(options, 'simoConfig.output.path', ''), api));
      }

      if (stats.hasErrors()) {
        logger.error(' 打包失败');
        reject(new Error('Webpack build failed'));
      } else if (stats.hasWarnings()) {
        logger.warn('打包成功，但具有警告信息');
        resolve('success');
      } else {
        logger.done('打包成功');
        resolve('success');
      }
    });
  }).then(() => {
    /**
     *  默认拷贝public内的非html文件
     */
    if (fs.existsSync(api.resolve('./public'))) {
      fs.copySync(
        api.resolve('./public'),
        api.resolve(_.get(options, 'simoConfig.output.path', '')),
        {
          dereference: true,
          filter: (file) => path.extname(file) !== '.html',
        },
      );
    }
  });
};
