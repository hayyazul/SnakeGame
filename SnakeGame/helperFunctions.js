function randInt(min, max) {
    /*
      Returns a random number between min and max inclusive.
    */

    return Math.random() * (max - min) + min;
}