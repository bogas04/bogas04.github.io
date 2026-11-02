declare module "heic-decode" {
  type DecodedHeicImage = {
    width: number;
    height: number;
    data: Uint8ClampedArray;
  };

  function decode(options: { buffer: Buffer }): Promise<DecodedHeicImage>;

  export default decode;
}
