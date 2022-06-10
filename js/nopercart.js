//======================================================================||
//               NOP Design JavaScript Shopping Cart                    ||
//                                                                      ||
// For more information on SmartSystems, or how NOPDesign can help you  ||
// Please visit us on the WWW at http://www.nopdesign.com               ||
//                                                                      ||
// Javascript portions of this shopping cart software are available as  ||
// freeware from NOP Design.  You must keep this comment unchanged in   ||
// your code.  For more information contact FreeCart@NopDesign.com.     ||
//                                                                      ||
// JavaScript Shop Module, V.4.4.0                                      ||
//                                                                      ||
//                                                                      ||
// This nopERcart version by Eugene Reimer, Version 2010-03-30,         ||
// ------------------------------------------------------------         ||
// has                                                                  ||
//   quantity-based discount pricing;                                   ||
// does                                                                 ||
//   shipping-calculations by Size & Weight as well as by Zone,         ||
//   alterable for retailer-location and package-deliverer,             ||
//   as well as for the items being offered for sale,                   ||
//   WITHOUT any programming;                                           ||
// detects situations where breaking up a parcel into several smaller   ||
//   packages lowers the shipping-cost, which is useful, for example,   ||
//   with Canada-Post's pricing;                                        ||
// supports 2 or more kinds of sales-tax, with different exceptions,    ||
//   and with multiple regions of applicability by customer location;   ||
//   different taxes can be shown on separate lines;                    ||
//   taxes can also be shown included in prices, yet itemized;          ||
//   everything that's needed in Canada, Australia, Europe, etc, as     ||
//   well as in the USA;                                                ||
// can handle any currency,                                             ||
//   whether the smallest actual-unit is thousandths or thousands, etc  ||
//   (although not the old British Pound-Shilling-Pence notation);      ||
// supports Checkout via:                                               ||
//   PayPal,                                                            ||
//   Google-Checkout,                                                   ||
//   AlertPay,                                                          ||
//   VirtualTerminalNetwork,                                            ||
//   InternetSecure                                                     ||
//   as well as the 3 methods from the original version;                ||
// supports ONE-step checkout,                                          ||
//   as well as the TWO-step checkout from the original version;        ||
//                                                                      ||
// for information on this nopERcart version,                           ||
//   see http://ereimer.net/nopercart.htm                               ||
//   or contact  ereimer@shaw.ca.                                       ||
//                                                                      ||
// Copyright (c) 2007,2010 NopDesign.com, Stefko, Eugene Reimer;        ||
// can be freely used, modified, copied, distributed, sold, etc,        ||
// under the terms of either the LGPL or the GPL (your choice);         ||
// see http://www.gnu.org/licenses for the details of these terms.      ||
//                                                                      ||
//======================================================================||

//----------------------------------------------------------------------||
//                                                                      ||
//                      Shopping-Cart Options                           ||
//                      =====================                           ||
// You can modify these options to change the way the cart functions.   ||
//                                                                      ||
//                                                                      ||
// Language Packs                                                       ||
// ==============                                                       ||
// You may include a language-pack along with nopercart.js in your      ||
// HTML pages to change the language.  For example:                     ||
//      <SCRIPT SRC="noper-language-fr.js"></SCRIPT>                    ||
//      <SCRIPT SRC="nopercart.js"></SCRIPT>                            ||
//                                                                      ||
// Many different language packs are provided together with this        ||
// software. Note: I'm far from fluent in (most of) those languages.    ||
// If you construct a new one OR make improvements to one of the        ||
// supplied ones, please email the result to  ereimer@shaw.ca           ||
// so it can be included with this software; you will be credited by    ||
// name, and also email-address, website, etc, if you wish.             ||
//                                                                      ||
//                                                                      ||
// Options For Everyone:                                                ||
// =====================                                                ||
//                                                                      ||
// * MoneySymbol: string, the symbol which represents dollars/euros/etc ||
//   in your locale.                                                    ||
//                                                                      ||
// * DisplayPopupOnAdd: true/false, controls whether the user is        ||
//   provided with a popup when adding to the cart.                     ||
//                                                                      ||
// * DisplayPopupOnRemove: true/false, controls whether the user is     ||
//   provided with a popup when removing from the cart.                 ||
//                                                                      ||
// * DisplayChangeQty: true/false; whether user permitted to change     ||
//   Qty on the viewcart page.                                          ||
//                                                                      ||
// * DisplayImgColumn: string, controls whether the viewcart page       ||
//   displays an image column, and specifies the image-type;            ||
//   use "jpg" for image filenames shopImage-ProductID.jpg;             ||
//   use empty-string for no image column;                              ||
//                                                                      ||
// * ImgPrefix: string, replacement for "shopImage-" in the image       ||
//   filenames described in preceding option.                           ||
//                                                                      ||
// * DisplayWtColumn: true/false, controls whether the viewcart         ||
//   page (initially) displays shipping-weight column.                  ||
//                                                                      ||
// * DisplaySzColumn: true/false, controls whether the viewcart         ||
//   page (initially) displays shipping-size column.                    ||
//                                                                      ||
// * DynamicWtSzColumns: number, possible values are:                   ||
//     0 = avoid using More-Info, Less-Info buttons;                    ||
//     1 = the MoreInfo-state displays the Size-column;                 ||
//     2 = the MoreInfo-state displays the Weight-column;               ||
//     3 = the MoreInfo-state displays both Weight & Size columns;      ||
//   nonzero means there'll be either a More-Info or Less-Info button   ||
//   on the PkgAttr row & so requires that DisplayPkgAttrRow be true;   ||
//   the Less-Info-state displays neither weight nor size column.       ||
//                                                                      ||
// * WTUNITS: string, units for item & package weights, eg: "lb".       ||
//                                                                      ||
// * SZUNITS: string, units for item & package sizes, eg "cm".          ||
//                                                                      ||
// * WTROUND: number; package-weight will be rounded-up to multiple of  ||
//   1/WTROUND;  use 1 for weight in grams, perhaps 100 for pounds.     ||
//                                                                      ||
// * SZROUND: number; package-length,width,height will each be rounded  ||
//   to multiple of 1/SZROUND.                                          ||
//                                                                      ||
// * MoneyPLACES: number, controls rounding & display of money-amounts; ||
//   use 2 for US-dollars rounded to cents, shown as dollars and cents; ||
//   or -3 if amounts are to be rounded to multiples of 1000, and       ||
//   shown without any fractional-part.                                 ||
//                                                                      ||
// * DisplayPkgAttrRow: true/false; controls whether the viewcart       ||
//   page shows the total size & weight line.                           ||
//                                                                      ||
// * DisplaySubtotalRow: 0/1/2/3;  use 1 to display subtotal before     ||
//   shipping, 2 for subtotal after shipping, 3 for both, 0 for neither.||
//                                                                      ||
// * DisplayShippingRow: true/false, controls whether the viewcart      ||
//   and checkout pages display a shipping-cost line at end of table.   ||
//                                                                      ||
// * DisplayTaxRow: true/false, controls whether the viewcart           ||
//   and checkout pages display tax-subtotal line(s) - whether one or   ||
//   multiple lines depends on the TaxNames option.                     ||
//                                                                      ||
// * DisplayRegionColumns: number, normally 1, but can be 2/3/4/...     ||
//   when a lot of Region-choices need multi-column display.            ||
//                                                                      ||
// * DisplayTaxIncluded: true/false; if true, then item prices are      ||
//   shown with taxes included, and the tax-subtotal lines are shown    ||
//   after the Total line, with the phrase "included in total".         ||
//   Note: if you use this tax-included pricing, then consider having   ||
//   a note on your View-Cart page advising a customer who needs the    ||
//   tax details to "print this page before checking out"  (because the ||
//   statement from the payment-processor will be inadequate WRT the    ||
//   tax details).                                                      ||
//                                                                      ||
// * TaxNames: array of string; use this to give names to your taxes    ||
//   if you have two or more kinds and want them shown separately;      ||
//   example: TaxNames = ["PST","GST"];                                 ||
//                                                                      ||
// * TaxRates: array, with one entry for each kind of tax you collect;  ||
//   example: TaxRates = [0.075, 0.05] for a 7.5% tax and a 5% tax.     ||
//   When converting from an older version, use:                        ||
//   TaxRates = [TaxRateRegional, TaxRate];                             ||
//                                                                      ||
// * TaxesByRegion: array, mapping from Region to array of Tax-number,  ||
//   specifying which taxes apply in each region; for example           ||
//   TaxesByRegion=[[0,1],[1],[2]] means Region#0 gets Tax#0 and Tax#1, ||
//   Region#1 gets Tax#1, Region#2 gets Tax#2.                          ||
//   When converting from an older version, use:                        ||
//   TaxesByRegion = [[0,1],[1]];                                       ||
//                                                                      ||
// * TaxesByID: defines the tax-exception prefixes, and specifies which ||
//   taxes apply for each such prefix;  for example, when using         ||
//   TaxesByID={n:[],p:[0],g:[1,2]}, then the first letter of an item's ||
//   ID will be interpreted as:                                         ||
//     "n" - no tax applies to this item;                               ||
//     "p" - only Tax#0 applies to this item;                           ||
//     "g" - only Tax#1 and Tax#2 apply to this item;                   ||
//     other - all taxes apply to this item;                            ||
//   Only those taxes permitted by both TaxesByRegion and TaxesByID     ||
//   will be applied.                                                   ||
//                                                                      ||
// * (PrefNeitherTax, PrefRegionalOnly, PrefNationalOnly options have   ||
//   been discarded in this version, replaced by TaxesByID.)            ||
//                                                                      ||
// * (TaxRateRegional and TaxRate options have been discarded in this   ||
//   version, replaced by the TaxRates array.)                          ||
//                                                                      ||
//   TAXES & REGIONS:                                                   ||
//   If you have a single tax that applies to all customers, then you   ||
//   don't need Regions.  If you have one tax charged only to those     ||
//   living in your own state/province, then you need two Regions.      ||
//   Most US retailers won't need more than one tax, two regions;       ||
//   however Canadian, Australian, New Zealand, and European retailers  ||
//   will need multiple taxes and multiple regions; eg: most Canadian   ||
//   retailers need three taxes and four regions.                       ||
//   With more than one Region, your customers may need to be prompted  ||
//   about which one they live in; to reduce or eliminate such          ||
//   prompting, see the RegionFromZone, RegionDefault, RegionPrompt     ||
//   options.                                                           ||
//   When two taxes are applicable, the combined-tax is computed        ||
//   as Amount TIMES (TaxRateA+TaxRateB); hmm, does anyone need two     ||
//   taxes with one going on top of the other?                          ||
//                                                                      ||
// * RegionFromZone: array, mapping from Zone to array of Regions legal ||
//   for that Zone, the first being the default for that Zone;          ||
//   for example, use [[0,1],[2]] if someone in your Zone#0 is in       ||
//   Region #0 or #1, someone in Zone#1 is in Region#2;                 ||
//   or use [[1,0],[2]] to make Region#1 the default for Zone#0;        ||
//   use [] to disable the validity-checking it offers.                 ||
//                                                                      ||
// * RegionDefault: number, controls how sales-tax calculations are     ||
//   done when user hasn't yet indicated which Region he/she is in;     ||
//   0 means Region#0, 1 means Region#1, 2 means Region#2;              ||
//   this option is ignored when RegionFromZone is being used.          ||
//                                                                      ||
// * RegionPrompt: string, with which to prompt a user who has not yet  ||
//   indicated which Region he/she is in;                               ||
//   use the empty-string to suppress such a prompt, in which case      ||
//   such user will be charged sales-tax using the defaults.            ||
//                                                                      ||
// * RegionTable: replaces the TaxableRegion, NonTaxableRegion options; ||
//   example: ["Manitoba Resident", "Other Canadian", "Other Country"]; ||
//   use [TaxableRegion, NonTaxableRegion] for compatibility with the   ||
//   original NopDesign version; this array can have any number of      ||
//   entries.                                                           ||
//                                                                      ||
// * RegionSuppressible: true/false; if true then Region-choices won't  ||
//   be shown for a Zone with only one possible Region.                 ||
//                                                                      ||
// * MinimumDonation: number, the minimum money-amount you're willing   ||
//   to accept as a donation;  example: a Canadian Charity using PayPal ||
//   needs a 3.50 minimum to ensure compliance with the 80%-rule.       ||
//                                                                      ||
// * MinimumDonationPrompt: string, with which to prompt donor not      ||
//   meeting the minimum-donation amount.                               ||
//                                                                      ||
// * MinimumOrder: number, the minimum money-amount that must be        ||
//   purchased before a user is allowed to checkout.  Set it to 0.01    ||
//   to disable this minimum, and yet prevent a completely empty cart   ||
//   being sent to your payment-processing.                             ||
//                                                                      ||
// * MinimumOrderPrompt: string, with which to prompt user who hasn't   ||
//   met the minimum-order amount.                                      ||
//                                                                      ||
// * NotesOnItem: true/false, controls whether Shipping-Zone and Tax-   ||
//   Region choices will appear in the info sent to Payment-Processor,  ||
//   after the last item;  use false for Google-Checkout since it has   ||
//   fields for this info;  for PayPal this info was previously passed  ||
//   in the "custom" field, but that was too private to be useful.      ||
//                                                                      ||
// * gcCurrency: string, currency-code to be passed to Google-Checkout  ||
//   for each item;  ignored when PaymentProcessor is not "gc".         ||
//                                                                      ||
// * isFlags: string, passed to InternetSecure as Flags on each item;   ||
//   ignored when PaymentProcessor is not "is".                         ||
//                                                                      ||
//                                                                      ||
// Payment Processor Options:                                           ||
// ==========================                                           ||
//                                                                      ||
// **NOTE: the PaymentProcessor, PaymentProcessor2 options, although    ||
//   still supported, are best regarded as OBSOLETE, since you can      ||
//   now specify your payment-processor via a parameter to ManageCart,  ||
//   CheckoutCart, and PaymentProcessorFields routines.                 ||
//                                                                      ||
// * PaymentProcessor: string, to specify your payment-processor;       ||
//   set it to one of:                                                  ||
//     "an"  (Authorize.net)                                            ||
//     "wp"  (Worldpay)                                                 ||
//     "lp"  (LinkPoint)                                                ||
//     "pp"  (PayPal)                                                   ||
//     "gc"  (GoogleCheckout)                                           ||
//     "ap"  (AlertPay -- NO LONGER SUPPORTED)                          ||
//     "vt"  (VirtualTerminalNetwork)                                   ||
//     "is"  (InternetSecure)                                           ||
//     ""    (custom HTML checkout-page)                                ||
//     "cgi" (custom CGI/PHP/ASP checkout-script)                       ||
//   When using "cgi", please review your OutputItem settings,          ||
//   explained below under Options for Programmers.                     ||
//                                                                      ||
// * PaymentProcessor2: string, taking the same values as shown for     ||
//   PaymentProcessor, but applies to CheckoutCart -- for those         ||
//   wanting a two-step checkout-process.                               ||
//   (TWO-Step-Checkout involves first an HTML checkout-page; and       ||
//   that page invokes CheckoutCart.)                                   ||
//                                                                      ||
// * AllInOne: true/false, specifies that a cart-supporting payment-    ||
//   processor, such as PayPal, be treated as non-cart-supporting,      ||
//   ie: the entire cart-contents described in one item-description;    ||
//   ignored when using a non-cart-supporting payment-processor.        ||
//                                                                      ||
//                                                                      ||
// Options to Control the Shipping-Calculations:                        ||
// =============================================                        ||
//                                                                      ||
// * ShipTable: array, explained below.                                 ||
//                                                                      ||
// * PackTable: array, explained below.                                 ||
//                                                                      ||
// * ZoneDefault: integer,  default entry-number in ShipTable;          ||
//   usually set to the most expensive case, so that a careless         ||
//   customer will pay at least enough.                                 ||
//                                                                      ||
// * ZonePrompt: string, with which to prompt a user who has not yet    ||
//   indicated which Shipping-Zone he/she is in; use the empty-string   ||
//   to suppress such a prompt, in which case such user will be         ||
//   charged shipping according to ZoneDefault.                         ||
//                                                                      ||
// * ShipTaxRate: number, the tax-rate to be applied to shipping prices ||
//   in ShipTable; use 0.05 if Canadian, 0.0 if US-American, or         ||
//   whatever "VAT" applies to your shipping price.  Note: this option  ||
//   is for a tax included in the shipping amount.                      ||
//                                                                      ||
// * ShipTaxName: string, for showing the tax included in the shipping  ||
//   amount;  use empty-string to not have that tax shown.              ||
//                                                                      ||
// * ShipTaxAsItems: true/false, an alternate way to tax shipping,      ||
//   at the same rate that items are taxed; this kind of tax is not     ||
//   shown included in shipping amount, but is included in Tax amount.  ||
//                                                                      ||
// * HandlingChargePerOrder: amount, handling-charge for the first      ||
//   package in an order.                                               ||
//                                                                      ||
// * HandlingChargePerExtraPackage: amount, handling-charge for each    ||
//   additional package in an order;  use a huge number if you prefer   ||
//   to ship one order as a single package.                             ||
//                                                                      ||
//                                                                      ||
// Options For Programmers:                                             ||
// ========================                                             ||
//                                                                      ||
// * OutputItem<..>, OutputOrder<..>: string, the left-side of a pair   ||
//   passed at checkouttime, if PaymentProcessor is "cgi".  Change      ||
//   these if your CGI script needs specific field names.               ||
//   NOTE: used only when PaymentProcessor=="cgi".                      ||
//                                                                      ||
// * AppendItemNumToOutput: true/false, if set to true, the number of   ||
//   each ordered item will be appended to the output string.  For      ||
//   example if OutputItemId is "ID_" and this is set to true, the      ||
//   output field name will be "ID_1", "ID_2" ... for each item.        ||
//   When in doubt use true.  This option must be true for cart-based   ||
//   payment-processors ("pp","gc").                                    ||
//                                                                      ||
// * Debug: integer, 255 for maximum debug-info, 256 for minimal,       ||
//   zero for none.  (the integer is a bitstring.)                      ||
//   NOTE: you no longer need to change this setting between 'test' and ||
//   'production, because this cart now distinguishes between those     ||
//   based on whether coming from a local hard-drive;  it will always   ||
//   provide the basic sanity-test popups when local, and will          ||
//   suppress Debug-output entirely when non-local.                     ||
//   (because Debug-messages would not be helpful to your customers)    ||
//                                                                      ||
// * CartID: string, when running several carts on the same website,    ||
//   giving each a distinct string prevents them sharing cookies.       ||
//                                                                      ||
// (The former HiddenFieldsToCheckout option has been discarded in      ||
// this version, replaced by PaymentProcessor=="cgi".)                  ||
//----------------------------------------------------------------------||
//                                                                      ||
//                      Minification:                                   ||
//                      =============                                   ||
// You can obtain a slight performance-improvement by minifying the     ||
// javascipt source-code; its size will be reduced by about 70%.        ||
//                                                                      ||
// To Minify, first rename this file to nopercart-readable.js,          ||
// then use the following commandline:                                  ||
//    jsminify <nopercart-readable.js >nopercart.js  "nopERcart Version 2010-03-30 -- readable copy at http://ereimer.net/nopercart.htm"  "(c) 2007,2010 NopDesign.com, Stefko, Eugene Reimer."
//                                                                      ||
// jsminify is available from  http://ereimer.net/programs/jsminify     ||
// or use jsmin from  http://www.crockford.com/javascript/jsmin.html    ||
//----------------------------------------------------------------------||

//------------------------------------------------------------------------
// Language Strings
// ----------------
// These strings will be used if you have not included a language-pack.
// If using English, simply modify the strings below;
// if using another language, then modify them in the file 
// noper-language-XX.js -- where XX is the language you are using.
// (File noper-language-en.js has been discarded in this version.)
//
// If you construct a new one OR make improvements to one of the 
// supplied ones, please email the result to  ereimer@shaw.ca
// so it can be included with this software, to help other users.
//------------------------------------------------------------------------
if(typeof strSorry == "undefined"){                                             //ER: make language-pack optional; was: if(!bLanguageDefined){
   strSorry = "Sorry, your basket is full, please proceed to checkout.";
   strAdded = "Added to your basket:";
   strAddedQuantity = "Quantity: ";                                             //ER: new;  needed by, but not added by, Stefko mods
   strAddedProduct  = "Product:  ";                                             //ER: new;  needed by, but not added by, Stefko mods
   strRemove = "Click ‘OK’ to remove this product from your shopping cart.";
   strTLabel = "Image";                                                         //ER: new 2009-03-21
   strILabel = "Product ID&nbsp;&nbsp;&nbsp";
   strDLabel = "Product name";
   strQLabel = "Qty";
   strPLabel = "Price";
   strWLabel = "Weight";                                                        //ER: new - for displaying Product WEIGHT in ManageCart;  replaces strSLabel
   strZLabel = "Size";                                                          //ER: new - for displaying Product SIZE in ManageCart
   strALabel = "Amount";                                                        //ER: new - replaces Stefko's "Ext." for displaying Price*Qty in CheckoutCart
   strRLabel = "&nbsp;";                                                        //ER: was: "Remove from Cart"  (Netscape-4 needs NBSP rather than EMPTYSTRING)
   strRButton= "Remove from basket";                                              //ER: was: "Remove"
   strMButton= "More info";                                                     //ER: new;  for the DynamicWtSzColumns option
   strLButton= "Less info";                                                     //ER: new;  for the DynamicWtSzColumns option
   strSUB = "SUBTOTAL";
   strWTSZTOT = "PACKAGE ATTRIBUTES";                                           //ER: new;  Stefko had strWTOT="TOTAL WEIGHT";  but now it's for Weight+Size
   strSHIP = "SHIPPING";
   strTAX = "TAX";
   strTOT = "TOTAL";
   strErrQty = "Invalid quantity.";
   strNewQty = "Please enter new quantity:";
   strSHIPPINGZONE = "SHIPPING<BR>ZONE";                                        //ER: new;  needed by, but not added by, Stefko mods
   strTAXABLEREGION = "TAXABLE<BR>REGION";                                      //ER: new;  needed by my rewrite of the sales-tax-by-region code
   strEA = "/ea";                                                               //ER: new;  needed by the original NopDesign version
   strCartEmpty = "Your basket is empty";                                         //ER: new;  needed by the original NopDesign version
   strAsMultiple = "as multiple packages:";                                     //ER: new;  for message from ComputeShipping
   strAsSingle = "as-one:";                                                     //ER: new;  for message from ComputeShipping
   strBroken="our shipping-calculator is broken; please inform our webmaster";  //ER: new;  message from ComputeShipping
   strTotalNaN="Your browser’s javascript appears to be broken. Another browser may help or contact the president if not";  //ER: new;  message from ValidateCart, when total is not a number
   strINCLUDEDINTOTAL = "Included in total";                                    //ER: new;  for the DisplayTaxIncluded option
   Language = "en";
}

//Options for Programmers:
OutputItemId         = "ID_";
OutputItemQuantity   = "QUANTITY_";
OutputItemPrice      = "PRICE_";
OutputItemName       = "NAME_";         //2008-02-07: now includes what was formerly in AddtlInfo
OutputItemWeight     = "WEIGHT_";       //Renamed by Stefko: Shipping-->Weight
OutputItemLength     = "LENGTH_";       //ER: new
OutputItemWidth      = "WIDTH_";        //ER: new
OutputItemHeight     = "HEIGHT_";       //ER: new
//tputItemAddtlInfo  = "ADDTLINFO_";    //2008-02-07: yanked, see OutputItemName
OutputOrderZone      = "SHIPZONE";      //Added by Stefko
OutputOrderRegion    = "TAXREGION";     //ER: new
OutputOrderSubtotal  = "SUBTOTAL";
OutputOrderShipping  = "SHIPPING";
OutputOrderTax       = "TAX";
OutputOrderTotal     = "TOTAL";
AppendItemNumToOutput= true;            //MUST be true for at least PayPal & Google-Checkout;  ER: suspect no-one ever uses false??
  CartID             = "";              //empty-string is fine for the first cart on one website
Debug                = 0;               //suppress DEBUG alerts
function DEBUG(str)   {if(Debug)   alert(str);}         //any nonzero value produces the DEBUG (sanity-test) alerts
function DEBUG1(str)  {if(Debug&1) alert(str);}         //the  1-bit controls DEBUG1  alerts
function DEBUG2(str)  {if(Debug&2) alert(str);}         //the  2-bit controls DEBUG2  alerts
function DEBUG4(str)  {if(Debug&4) alert(str);}         //the  4-bit controls DEBUG4  alerts
function DEBUG8(str)  {if(Debug&8) alert(str);}         //the  8-bit controls DEBUG8  alerts
function DEBUG16(str) {if(Debug&16)alert(str);}         //the 16-bit controls DEBUG16 alerts
if(window.location.href.substring(0,5)=="file:") Debug|=256;  else Debug=0;     //2008-02-20: smart (Opera-like) behaviour wrt Debug-alerts...

//Options for Everyone:
  MoneySymbol          = "£";           //use dollar-symbol
  DisplayPopupOnAdd    = false;         //suppress "add to cart" popups  (DEFAULT true in NopDesign version)
  DisplayPopupOnRemove = false;         //suppress "remove from cart" popups  (not suppressable in NopDesign version)
  DisplayChangeQty     = false;         //suppress changeable quantity-field  (added by Stefko)
  DisplayImgColumn     = "";            //don't show a Thumbnail-Image column in ManageCart
  ImgPrefix            = "shopImage-";  //prefix for ImgColumn-filenames
  DisplayWtColumn      = false;         //don't show a Shipping-WEIGHT column in ManageCart
  DisplaySzColumn      = false;         //don't show a Shipping-SIZE column in ManageCart
  DynamicWtSzColumns   = 3;             //a clickable "More Info" button, to have both Shipping-WEIGHT+SIZE columns shown
  WTUNITS              = "g";           //grams  (needed by but not added by Stefko mods; he used "lbs")
  SZUNITS              = "cm";          //units for Item & Package SIZEs
  WTROUND              = 1;             //want Package-Weight rounded-up to integer
  SZROUND              = 10;            //Package-Length,Width,Height rounded to multiple of 0.1
  MoneyPLACES          = 2;             //currency needs two decimal places as in dollars and cents
  DisplaySubtotalRow   = 1;             //display subtotal before shipping
  DisplayPkgAttrRow    = true;          //show the total size & weight
  DisplayShippingRow   = true;          //show the shipping-cost-line
  DisplayRegionColumns = 1;             //single-column for Region-choices
  DisplayTaxRow        = true;          //show the tax-line
  DisplayTaxIncluded   = false;         //do not show tax-included prices
  ShipTaxAsItems       = false;         //do not tax shipping by the same-rate-as-on-items method

  TaxNames             = ["PST","GST","HST"]; //names for the sales-taxes in Canada
  TaxRates             = [0.07,0.05,0.13]; //a 7% tax for Region#0, 5% for Regions #0 and #2, and 13% for #1 (Manitoba PST, Canadian GST, HST)
  TaxesByID            = {n:[], p:[0], g:[1,2]};        //product-IDs n* get no tax, p* get Tax#0 only, g* get Tax#1 and #2 only
  TaxesByRegion        = [[0,1],[2],[1]];               //Region#0 gets Tax#0+Tax#1; Region#1 gets Tax#2, Region#2 gets Tax#1
  RegionTable          = ["Manitoba", "Canadian HST Province", "Other Canadian Province", "Other Country"];     //for 3 taxes in 4 Regions
  RegionFromZone       = [[0,1,2],[3],[3]];             //customer in Zone#0 can be in Region#0 or 1 or 2;  Zone1 or 2 implies Region3
  RegionDefault        = 0;                             //default Region, ignored if RegionFromZone used, when first entry is default
  RegionPrompt         = "Please indicate whether you are a resident of Manitoba for tax purposes, before continuing";        //prompt for MB
  RegionSuppressible   = false;                         //avoid the region-suppression feature
  DefaultDonation      = 0.01;                          //default Donation-Amount for donor who provides an invalid amount
  MinimumDonation      = 0.01;                          //minimum Donation-Amount
  MinimumDonationPrompt= "We're sorry but we're unable to accept a donation of less than 0.01"; //
  MinimumOrder         = 0.01;                                                                  //prevent empty-cart to checkout
  MinimumOrderPrompt   = "Your cart is empty; please order something before checking out.";     //minimum-order prompt
  PrefDonation         = "nDO";                         //donations have IDs beginning with nDO
  SameCountry          = 2;                             //highest region in same country, used only if ShipTaxName being used
  gcCurrency           = "USD";                         //currency-code for Google-Checkout
  NotesOnItem          = true;                          //want shipping+region-notes onto last item

//Payment Processor Options:
  PaymentProcessor     = "pp";          //payment-processor for ManageCart;  is now supplied in shoppingcart.htm
  PaymentProcessor2    = "cgi";         //payment-processor for CheckoutCart;  is now supplied in shoppingcheckout.htm
  AllInOne             = false;         //use cart-support with PayPal

//========================================================================
// Shipping-Info Table
// -------------------
// Several examples are provided, to illustrate how you can go about 
// creating a table that describes shipping from your location, by the 
// package-deliverer you've chosen.  
//
// RESTRICTION: in the present version, the Length & Width must be the
// same in all pkginfo-entries for one zone.
//
// NOTE:  "*" in last column (of PkgClass) indicates multiple of these 
// (or smaller) may cost less than shipping as one package, and the 
// shipping-calculator is to try it both ways;  this feature works best 
// when size matters and Packing-Rules are provided.
// (!!future enhancement: program to derive the "*" info itself.)
//========================================================================
//
  //----------------------------------------------------------------------
  //---EXAMPLE-1: for Canadian-retailer who ships by Canada-Post---
  //
  // This first example is for a Canadian retailer using Canada-Post,
  // Weight & Size based shipping, with Weight in grams, sizes in centimetres;
  // (you'll need minor changes even if you are a Canadian retailer, if your
  // location is other than Winnipeg).
  // (Separate examples illustrate shipping via UPS & USPS for a retailer
  // in the USA, via TNT-Post for a European retailer, and via Royal-Mail
  // for a British retailer.)
  //----------------------------------------------------------------------
  ShipTable = [];                                                                               //init array
  ShipTable[0]= new ShipEntry("Within Canada",    []);                                          //Zone#0 = Within Canada
  ShipTable[1]= new ShipEntry("To USA",           []);                                          //Zone#1 = To USA
  ShipTable[2]= new ShipEntry("To International", []);                                          //Zone#2 = To International
  //package-categories within Canada:
  ShipTable[0].pkginfo[ 0]=new PkgClass(  100, new Size(33.6,23.4,  1.8),  1.22, 0.00, 1,  ""); //OSL up to 100g, 33.6x23.4x1.8cm, costs 1.22
  ShipTable[0].pkginfo[ 1]=new PkgClass(  200, new Size(33.6,23.4,  1.8),  2.00, 0.00, 1,  ""); //OSL up to 200g, 33.6x23.4x1.8cm
  ShipTable[0].pkginfo[ 2]=new PkgClass(  500, new Size(33.6,23.4,  1.8),  3.25, 0.00, 1, "*"); //OSL up to 500g, 33.6x23.4x1.8cm
  ShipTable[0].pkginfo[ 3]=new PkgClass( 1000, new Size(33.6,23.4,  7.6), 11.47, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[ 4]=new PkgClass( 1500, new Size(33.6,23.4, 11.4), 12.32, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[ 5]=new PkgClass( 2000, new Size(33.6,23.4, 15.3), 12.99, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[ 6]=new PkgClass( 2500, new Size(33.6,23.4, 19.1), 13.42, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[ 7]=new PkgClass( 3000, new Size(33.6,23.4, 22.9), 14.08, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[ 8]=new PkgClass( 3500, new Size(33.6,23.4, 26.7), 14.73, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[ 9]=new PkgClass( 4000, new Size(33.6,23.4, 30.5), 15.39, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[10]=new PkgClass( 5000, new Size(33.6,23.4, 38.2), 16.71, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[11]=new PkgClass( 6000, new Size(33.6,23.4, 45.8), 17.95, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[12]=new PkgClass( 7000, new Size(33.6,23.4, 53.4), 19.20, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[13]=new PkgClass( 8000, new Size(33.6,23.4, 61.1), 20.45, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[14]=new PkgClass(10000, new Size(33.6,23.4, 76.3), 22.95, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[15]=new PkgClass(12000, new Size(33.6,23.4, 91.6), 25.45, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[16]=new PkgClass(15000, new Size(33.6,23.4,114.5), 36.78, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[17]=new PkgClass(20000, new Size(33.6,23.4,152.6), 43.03, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[18]=new PkgClass(25000, new Size(33.6,23.4,160.0), 48.41, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[19]=new PkgClass(30000, new Size(33.6,23.4,160.0), 53.80, 0.00, 1,  ''); //P parcel
  ShipTable[0].pkginfo[20]=new PkgClass(60000, new Size(33.6,23.4,320.0), 18.60, 0.775,500,''); //P parcel
  ShipTable[0].pkginfo[21]=new PkgClass(90000, new Size(33.6,23.4,480.0), 27.89, 0.775,500,''); //P parcel
  //package-categories for to-USA shipping:
  ShipTable[1].pkginfo[ 0]=new PkgClass(  100, new Size(33.6,23.4,  1.8),  2.00, 0.00, 1,  ""); //OSL 100g (LP 2.11)
  ShipTable[1].pkginfo[ 1]=new PkgClass(  200, new Size(33.6,23.4,  1.8),  3.50, 0.00, 1,  ""); //OSL 200g
  ShipTable[1].pkginfo[ 2]=new PkgClass(  250, new Size(33.6,23.4,  1.8),  4.73, 0.00, 1,  ""); //LP  250g (SP-Air:6.94)
  ShipTable[1].pkginfo[ 3]=new PkgClass(  500, new Size(33.6,23.4,  1.8),  7.00, 0.00, 1,  ""); //OSL 500g (LP 7.61; SP-Air:9.21)
  ShipTable[1].pkginfo[ 4]=new PkgClass( 1000, new Size(33.6,23.4, 33.0), 11.54, 0.00, 1, "*"); //SP  1kg  (SP-Air:14.29)
  ShipTable[1].pkginfo[ 5]=new PkgClass( 1500, new Size(33.6,23.4, 11.4), 30.39, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[ 6]=new PkgClass( 2000, new Size(33.6,23.4, 15.3), 32.23, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[ 7]=new PkgClass( 2500, new Size(33.6,23.4, 19.1), 34.26, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[ 8]=new PkgClass( 3000, new Size(33.6,23.4, 22.9), 38.24, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[ 9]=new PkgClass( 3500, new Size(33.6,23.4, 26.7), 40.58, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[10]=new PkgClass( 4000, new Size(33.6,23.4, 30.5), 41.50, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[11]=new PkgClass( 5000, new Size(33.6,23.4, 38.2), 46.23, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[12]=new PkgClass( 6000, new Size(33.6,23.4, 45.8), 52.24, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[13]=new PkgClass( 7000, new Size(33.6,23.4, 53.4), 57.41, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[14]=new PkgClass( 8000, new Size(33.6,23.4, 61.1), 62.80, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[15]=new PkgClass(10000, new Size(33.6,23.4, 76.3), 72.38, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[16]=new PkgClass(12000, new Size(33.6,23.4, 91.6), 80.37, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[17]=new PkgClass(15000, new Size(33.6,23.4,114.5), 98.38, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[18]=new PkgClass(20000, new Size(33.6,23.4,152.6),130.49, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[19]=new PkgClass(25000, new Size(33.6,23.4,160.0),160.82, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[20]=new PkgClass(30000, new Size(33.6,23.4,160.0),175.86, 0.00, 1,  ''); //P parcel
  ShipTable[1].pkginfo[21]=new PkgClass(60000, new Size(33.6,23.4,320.0), 41.48, 2.661,500,''); //P parcel
  ShipTable[1].pkginfo[22]=new PkgClass(90000, new Size(33.6,23.4,480.0), 62.23, 2.661,500,''); //P parcel
  //package-categories for to-International shipping:
  ShipTable[2].pkginfo[ 0]=new PkgClass(  100, new Size(33.6,23.4,  1.8),  4.00, 0.00, 1,  ""); //OSL 100g (LP 4.45)
  ShipTable[2].pkginfo[ 1]=new PkgClass(  200, new Size(33.6,23.4,  1.8),  7.00, 0.00, 1,  ""); //OSL 200g
  ShipTable[2].pkginfo[ 2]=new PkgClass(  250, new Size(33.6,23.4,  1.8),  8.95, 0.00, 1,  ""); //LP  250g
  ShipTable[2].pkginfo[ 3]=new PkgClass(  500, new Size(33.6,23.4,  1.8), 14.00, 0.00, 1,  ""); //OSL 500g (LP:15.25)
  ShipTable[2].pkginfo[ 4]=new PkgClass( 1000, new Size(33.6,23.4, 33.0), 15.19, 0.00, 1,  ""); //SP  1kg  (SP-Air:34.42)
  ShipTable[2].pkginfo[ 5]=new PkgClass( 2000, new Size(33.6,23.4, 33.0), 22.26, 0.00, 1, "*"); //SP  2kg  (SP-Air:53.61)
  ShipTable[2].pkginfo[ 6]=new PkgClass( 2500, new Size(33.6,23.4, 19.1), 44.17, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[ 7]=new PkgClass( 3000, new Size(33.6,23.4, 22.9), 48.18, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[ 8]=new PkgClass( 3500, new Size(33.6,23.4, 26.7), 53.82, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[ 9]=new PkgClass( 4000, new Size(33.6,23.4, 30.5), 60.94, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[10]=new PkgClass( 5000, new Size(33.6,23.4, 38.2), 74.37, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[11]=new PkgClass( 6000, new Size(33.6,23.4, 45.8), 80.67, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[12]=new PkgClass( 7000, new Size(33.6,23.4, 53.4), 86.98, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[13]=new PkgClass( 8000, new Size(33.6,23.4, 61.1), 92.68, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[14]=new PkgClass(10000, new Size(33.6,23.4, 76.3),102.43, 0.00, 1,  ''); //P parcel
  ShipTable[2].pkginfo[15]=new PkgClass(20000, new Size(33.6,23.4,152.6), 55.14, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[16]=new PkgClass(30000, new Size(33.6,23.4,228.9), 82.71, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[17]=new PkgClass(40000, new Size(33.6,23.4,305.3),110.28, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[18]=new PkgClass(50000, new Size(33.6,23.4,381.6),137.85, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[19]=new PkgClass(60000, new Size(33.6,23.4,457.9),165.42, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[20]=new PkgClass(70000, new Size(33.6,23.4,534.2),192.99, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[21]=new PkgClass(80000, new Size(33.6,23.4,610.5),220.56, 4.042,500,''); //P parcel
  ShipTable[2].pkginfo[22]=new PkgClass(90000, new Size(33.6,23.4,686.8),248.13, 4.042,500,''); //P parcel
  ZoneDefault = 2;                                                              //make Zone#2 the Default
  ZonePrompt  = "Please indicate your Shipping Zone before continuing";         //prompt for Zone
  ShipTaxRate = 0.05;                           //Canadian GST must be added to shipping-prices quoted by CanadaPost
  ShipTaxName = "TAX-GST Included in Shipping"; //show the tax included in shipping
  HandlingChargePerOrder =        0.50;         //HandlingCharge for the first package in an order
  HandlingChargePerExtraPackage = 0.50;         //HandlingCharge per additional package
  //
  // NOTES:
  // ------
  // 1. Canada-Post's size-limit for Oversized-Letter (OSL) and Light-Packet (LP) is 38x27x2cm,  however since the closest readily-obtainable
  // padded envelope, 14.5x9.5 inches, offers usable inside dimensions of 33.6x23.4x1.8 cm,  that's how the limit is expressed above.
  //
  // 2. Canada-Post's size-limit for Small-Packet (SP) is Length<=60cm AND Length+Width+Height<=90cm;
  // that limit is expressed above as 33.6x23.4x33.0 (which sums to 90cm) in order to simplify the package-size calculations;
  // (for the items in the PackingRule-example below, could do very slightly better by expressing it as 32x23x35, and making all pkgs 32x23).
  // Size-limit for Parcel (P) Length<=200cm AND Length+2*Width+2*Height<=274cm, could be expressed as 33.6x23.4x160.0, but isn't...
  //
  // 3. For its OSL, LP, SP(*) categories, Canada-Post prices are exactly 3-way (within-Canada, to-USA, to-International) as shown above;
  // however, for PARCELS (P) their rate varies by City/Province within Canada, by State for to-USA, and by Country for International;
  // the Parcel-rates shown above are: Winnipeg-to-Halifax used for within-Canada, to-Florida for USA, and to-Australia for International.
  // Parcel prices consist of base-rate plus fuel-surcharge; base-rates are revised once per year at most; but fuel-surcharges vary slightly
  // from month to month; the prices shown were checked on 2007-07-15.
  // Parcels are priced in 0.5kg ranges; i.e. weight gets rounded-up to multiple of 500g.
  //
  // 3-b. Revised for rates starting 2008-01-14;  the LP and SP rates were estimated as those have yet to be published;
  // note: SP to-International will now be broken into zones, but the details remain unpublished, as of 2008-01-13;
  // the parcel rates were increased by 5.1% but not checked further.
  //
  // 3-c. For rates starting 2009-01-12;  revised OSL, LP, SP;  the SP-by-ZONE rates are now published;
  // note: OSL and LP are no longer identical for the 100g, 500g limits they have in common (the silliness has gotten sillier);
  // ZONES: Winnipeg-to-Florida is zone:7;  Australia is zone:05/105/405;  Parcel rates went down due to fuel-surcharge being reduced;
  // the Parcel rates are now computed using the CanadaPost-Sell-Online tool, with my CanadaPost-SellOnline-get-quotes Perl script.
  //
  // 4. Some EXAMPLES where SPLITTING-UP is beneficial (with 2007 Canada-Post rates) are:
  // within-Canada, sending FIVE 500g OSL's costs less than one 2.5kg parcel (FIVE 500g OSL's even wins over a 2.0kg parcel);
  // to-International, sending FIVE 2kg SP's costs less than one 10kg parcel;
  // the to-USA pricing is much closer to being sensible,  however sending 1kg SP + 500g OSL costs less than one 1.5kg parcel.
  //


//========================================================================
// Packing-Rule Info (OPTIONAL)
// ----------------------------
// The program will work without this Packing-Rule info, but will then
// be more prone to overcharging the customer for shipping.
// You may want to pre-compute packing rules like these, which will be
// feasible provided your list of item-sizes is fairly short.
// (And if its really short, you probably won't need them:-)
//
//========================================================================
PackTable = [];                 //--LEAVE THIS LINE even when omitting Packing-Rule Info
  //--OPTIONAL INFO - the rest of this section may be omitted--
  //
  //--Item sizes and Package sizes -- for NativeOrchid.Org:
  itmca= new Size(32.0, 23.00, 0.3);    //calendar  size:32x23x0.3cm             weight:101g  (07oct18:new, 07nov15:95g->101g)
  itmbk= new Size(23.0, 15.00, 1.2);    //book 23x15x1.2cm (8.5x5.5x0.5 inches)  weight:333.333g
  itmdv= new Size(15.0, 13.00, 0.6);    //DVD in a jewel-case                    weight:50g
  itmlg= new Size(11.5,  8.00, 1.8);    //large-pin                              weight:16g
  itmsm= new Size( 8.0,  5.75, 1.8);    //small-pin;  N of these will be simplified to N/2 (rounded up) of the preceding
  PKG1=  new Size(32.0, 23.00, 1.8);    //package-size that qualifies as a CanadaPost Oversized-Letter
  //
  //--Packing-Rules to make PKG1's of at most 500g, that qualify for CanadaPost's Oversized-Letter (OSL) rate:
  packTo500g = [];                                                      //
  packTo500g[0]= new PackingRule([itmsm],  [2],                itmlg);  //2 itmsm equivalent to one itmlg
  packTo500g[1]= new PackingRule([itmbk,itmdv,itmlg], [1,3,1], PKG1);   //size permits [1,4,1] and [2,2,0] but weight prevents
  packTo500g[2]= new PackingRule([itmbk,itmdv,itmlg], [1,1,4], PKG1);   //
  packTo500g[3]= new PackingRule([      itmdv,itmlg], [  6,2], PKG1);   //
  packTo500g[4]= new PackingRule([      itmdv,itmlg], [  3,5], PKG1);   //
  packTo500g[5]= new PackingRule([            itmlg], [    8], PKG1);   //
  packTo500g[6]= new PackingRule([itmbk,itmdv,itmca], [1,1,1], PKG1);   //weight prevents more...  (itmca rules added 07oct18)
  packTo500g[7]= new PackingRule([      itmdv,itmca], [  4,2], PKG1);   //
  packTo500g[8]= new PackingRule([      itmdv,itmca], [  2,3], PKG1);   //07nov15: 2+4->2+3
  packTo500g[8]= new PackingRule([      itmdv,itmca], [  1,4], PKG1);   //07nov15: 0+5->1+4
  //
  PackTable[0] = packTo500g;    //Within-Canada
  PackTable[1] = packTo500g;    //To-USA
  PackTable[2] = packTo500g;    //To-International
  //==!!Future Enhancement:  a script that reads a given set of HTML files, extracting items for sale, and computing the PackingRules.
  //NOTE: our calendars demonstrate a flaw in the "Shipping-Weight" approach:  one 95g calendar plus packaging weighs just over 100g;
  //  2 plus packaging just over 200g;  however 5 plus packaging is just UNDER 500g.  Without a modification for weight-of-packaging,
  //  the only answer is to use a shipping-weight of 101g and thus overcharge (on shipping) for an order of 5 calendars.


//======================================================================||
//----------------------------------------------------------------------||
// YOU DO NOT NEED TO MAKE ANY MODIFICATIONS BELOW THIS LINE            ||
// If you wish to venture below this line and are new to javascript,    ||
// then I recommend:  http://www.crockford.com/javascript/survey.html;  ||
// (my code would be better had I read it first:-)                      ||
//----------------------------------------------------------------------||
//======================================================================||


//========================================================================
// Objects and Methods related to Package-Size;
// by Eugene Reimer 2007-07-01.
//
// Some notes to myself:
// -- don't really need constructors;  eg: ShipEntry(A,B) --> {zone:A, pkginfo:B}
// -- possibly avoid size-field & doubly-dotted-selectors??  the SizeXX functions can accept any object having L,W,H fields...
// -- could rewrite ShipTable & packBySz initializers using ARRAYOBJECT.push
//    also ARRAYOBJECT[ARRAYOBJECT.length]=xxx;  -->  ARRAYOBJECT.push(xxx);
// -- was tempted to use for(VAR in ARRAYOBJECT) iteration, but it's illegal/ill-advised for arrays (only for objects);  also doesn't do what's wanted...
// -- wondered whether it's possible to redefine/overload the == operator instead of my SizeEQ routine;  found some info in:
//    http://www.mozilla.org/js/language/js20-2000-07/libraries/operator-overloading.html  -- doesn't sound promising...
// -- oldest supported browsers:  Netscape-4.06 and IE4/5 conform to ECMA-262-Edition-1 (Javascript-1.3/JScript-3.0), which has push,unshift,split, but not regexprs!
//      note: slice, substr not in ECMA-262-Edition-1, yet both of those browsers had them??  (using only substring to be safe)
//      indexOf is nonstd, yet both browsers had it  --see http://developer.mozilla.org/en/docs/Core_JavaScript_1.5_Reference:Objects:Array:indexOf  if code needed
//      NOTE: getAttribute and/or the DOM being used (for new-style attributes) are not supported by Netscape-4--!!--
//
// Future enhancements:
// May use parts of the Bin-Packing algorithm by Martello, Pisinger, Vigo,
// as published in http://www.diku.dk/~pisinger/3dbpp.c
// (see also http://forums.devshed.com/software-design-43/3d-bin-packing-49217.html);
//========================================================================
var PkgQueue = null;                                                    //an array of Qszwt entries;  describes the items (later the packages) in the current order
var PkgAsOne = null;                                                    //of type Qszwt;  the resulting package size & weight
var sComputeShippingNote="";                                            //an additional note about shipping to be shown to the customer during View-Cart
var gVat=0;                                                             //amount of VAT-tax included in the shipping-cost
function PrefEQ(A,B) {return A.substring(0,B.length)==B;}               //compare string-prefix
function NumberZ(s) {var N=Number(s); if(isNaN(N))N=0; return(N);}      //like the javascript Number, except it returns zero instead of NaN
function Integer(s) {return Math.round(NumberZ(s));}
moneyEps= Math.pow(10, -MoneyPLACES);                                   //smallest nonzero monetary-amount
MoneyROUND_FRA= Math.pow(10, +MoneyPLACES);                             //replaces 100 in all money-rounding  when PLACES>0
MoneyROUND_NOF= Math.pow(10, -MoneyPLACES);                             //for reciprocal-based money-rounding when PLACES<=0
function CentsFRA(f) {return  Math.round(f*MoneyROUND_FRA) / MoneyROUND_FRA;}
function CentsNOF(f) {return  Math.round(f/MoneyROUND_NOF) * MoneyROUND_NOF;}
Cents = (MoneyPLACES>0 ?CentsFRA :CentsNOF);                            //money-rounding function, init according to which rounding-method is needed
function WtRndUP(x) {return Math.ceil( x*WTROUND)/WTROUND;}             //weight-rounding function that rounds-UP
function WtRnd(x)   {return Math.round(x*WTROUND)/WTROUND;}             //weight-rounding function
function SzRnd(x)   {return Math.round(x*SZROUND)/SZROUND;}             //dimension-rounding function
function Element(E,S) {for(var e=S.length;e--;)if(E==S[e])return true; return false;}   //is-an-element-of for set as an array; may switch to bitstring...
//function Element(E,S) {return (S&(1<<E))!=0;}                                         //is-an-element-of for bitstring  (set with elements 0..31)
//
//--sanity-checking and initialization related to Options:
while(PackTable.length < ShipTable.length) PackTable.push([]);                                                                          //ensure an entry for each Zone
if(RegionFromZone.length && RegionFromZone.length < ShipTable.length) DEBUG("RegionFromZone must have as many entries as ShipTable");
X=[];for(Z=ShipTable.length;Z--;)X[Z]=false; for(Z=RegionFromZone.length;Z--;)X[Z]=(RegionFromZone[Z].length==1);  RegionFromZoneOvA=X; //RfromZ-Overrides boolean-array
X=0; Z=RegionFromZone.length; if(Z>0) {X=1; while(Z--)X&=RegionFromZoneOvA[Z];}  RegionFromZoneOverrides=X;                             //was an option, now derived
if(RegionFromZone.length) {X=[];for(R=0;R<RegionTable.length;++R)X.push(R); while(RegionFromZone.length < ShipTable.length)RegionFromZone.push(X);} //entry for each zone
if(TaxNames.length>=2) while(TaxNames.length < TaxRates.length) TaxNames.push("UnNamedTax");                                            //ensure an entry for each Tax
while(TaxesByRegion.length < RegionTable.length) TaxesByRegion.push([]);                                                                //ensure an entry for each Region
RegionsUsed=(RegionTable.length>=2);                                                                                                    //replaces TaxRateRegional!=0
X=[];for(R=RegionTable.length;R--;)X.push(0); for(RZ=RegionFromZone,Z=RZ.length;Z--;) {E=RZ[Z];for(K=E.length;K--;)++X[E[K]];}
Y=[];for(R=X.length;R--;)Y[R]=(X[R]==1); ZoneFromRegionOvA=Y;                                                                           //ZfromR-Overrides boolean-array
//------------------------------------------------------------------------
// CONSTRUCTOR:  ShipEntry (zone, pkginfo)
//------------------------------------------------------------------------
function ShipEntry (zone,pkginfo){
   this.zone=zone;
   this.pkginfo=pkginfo;
}
//------------------------------------------------------------------------
// CONSTRUCTOR:  PkgClass (weight, size, costfixed, costperwtunit, wtunit, flag)
//------------------------------------------------------------------------
function PkgClass (weight,size,costfixed,costperwtunit,wtunit,flag){
   this.weight=weight;
   this.size=size;
   this.costfixed=costfixed;
   this.costperwtunit=costperwtunit;
   this.wtunit=wtunit;
   this.flag=flag;
}
//------------------------------------------------------------------------
// CONSTRUCTOR:  PackingRule (itmsizeinfo, itmqtyinfo, pkgsize)
//------------------------------------------------------------------------
function PackingRule (itmsizeinfo,itmqtyinfo,pkgsize){
   this.itmsizeinfo=itmsizeinfo;
   this.itmqtyinfo=itmqtyinfo;
   this.pkgsize=pkgsize;
}
//------------------------------------------------------------------------
// CONSTRUCTOR:  Size (Length, width, height)
//------------------------------------------------------------------------
function Size (Length,width,height){
   this.Length=NumberZ(Length); //calling it this.length could be trouble since objects already have a length attribute?
   this.width =NumberZ(width );
   this.height=NumberZ(height);
}
//------------------------------------------------------------------------
// CONSTRUCTOR:  Qszwt (qty, size, weighteach)
//------------------------------------------------------------------------
function Qszwt (qty,size,weighteach){
   this.qty   =Integer(qty);
   this.size  =size;
   this.weight=NumberZ(weighteach) * qty;
   this.wt=[];  for(var w=0; w<qty; ++w) this.wt[w]= NumberZ(weighteach);
   //the wt array is needed to handle same-size items having different weights
}
//------------------------------------------------------------------------
// FUNCTION:  SizeStr (size) -- convert size to string
//------------------------------------------------------------------------
function SizeStr (size){
   return(size.Length + "x" + size.width + "x" + size.height);
}
//------------------------------------------------------------------------
// FUNCTION:  SizeVolume (size) -- returns the volume==Length*width*height;
//------------------------------------------------------------------------
function SizeVolume (size){
   return(size.Length * size.width * size.height);
}
//------------------------------------------------------------------------
// FUNCTION:  SizeEQ (size1, size2) -- compare two sizes for equality
//------------------------------------------------------------------------
function SizeEQ (size1,size2){
   return(size1.Length==size2.Length && size1.width==size2.width && size1.height==size2.height);
}
//------------------------------------------------------------------------
// FUNCTION:  InitPkgQueue() -- initialize the PkgQueue
//------------------------------------------------------------------------
function InitPkgQueue(){
   PkgQueue = [];       //init to an empty array
}
//------------------------------------------------------------------------
// FUNCTION:  AddPkgQueueEntry (qty, size, weighteach) -- revise the global PkgQueue, an array-of-Qszwt;
// if there is an entry for size in PkgQueue, then update its qty & weight;
// otherwise add an entry.
//------------------------------------------------------------------------
function AddPkgQueueEntry (qty,size,weighteach){
   for(var i=0; i<PkgQueue.length; ++i) if(SizeEQ(PkgQueue[i].size, size)){
      PkgQueue[i].qty += Integer(qty);
      PkgQueue[i].weight += NumberZ(weighteach)*Integer(qty);  for(var w=0; w<qty; ++w) PkgQueue[i].wt.push(NumberZ(weighteach));
      return;
   }
   PkgQueue.push(new Qszwt(qty,size,weighteach));
}
//------------------------------------------------------------------------
// FUNCTION:  RemovePkgQueueEntry (i) -- remove the PkgQueue[i] entry
//------------------------------------------------------------------------
function RemovePkgQueueEntry (i){
   PkgQueue.splice(i, 1);
}
//------------------------------------------------------------------------
// FUNCTION:  ShowPkgQueue -- display the PkgQueue  (convert to string)
//------------------------------------------------------------------------
function ShowPkgQueue(){
   var str="";
   for(var i=0; i<PkgQueue.length; ++i){
      str+= "qty:"+PkgQueue[i].qty +"; sz:"+SizeStr(PkgQueue[i].size) +"; wt:"+Math.round(PkgQueue[i].weight) +" [";
      for(var w=0; w<PkgQueue[i].qty; ++w) str+= Math.round(PkgQueue[i].wt[w]) + " ";
      str+= "]\n";
   }
   return str;
}
//------------------------------------------------------------------------
// FUNCTION:  PickAndApplyPackingRule -- find & apply the best matching PackingRule,
// thereby simplifying the global PkgQueue;  returns false if no rule matches;
// Algorithm:
// if we have any size mentioned in only one PackingRule, then apply that rule;
// otherwise, pick the best matching rule (by volumetric efficiency**) and apply it
//------------------------------------------------------------------------
function PickAndApplyPackingRule(PackingRule){
   var SZ=null;  var P=null;  var bestGoodness=0;
   for(var i=0; i<PkgQueue.length; ++i){
      var sz=PkgQueue[i].size,  p=null,  ct=0;
      for(var r=0; r<PackingRule.length; ++r) for(var e=0; e<PackingRule[r].itmsizeinfo.length; ++e) if(SizeEQ(PackingRule[r].itmsizeinfo[e], sz)){
         p=r; ++ct; break;
      }
      if(ct==1) {SZ=sz; P=p; break;}                            //--have found P an ONLY rule for size SZ
   }
   if(SZ==null){
      var minRV=99999999; for(var r=0; r<PackingRule.length; ++r) {var RV= SizeVolume(PackingRule[r].pkgsize); if(RV<minRV) minRV=RV;}
      for(var r=0; r<PackingRule.length; ++r){
         var MV=0;
         for(var e=0; e<PackingRule[r].itmsizeinfo.length; ++e) for(var i=0; i<PkgQueue.length; ++i) if(SizeEQ(PackingRule[r].itmsizeinfo[e], PkgQueue[i].size)){
            MV+= SizeVolume(PkgQueue[i].size) * Math.min(PkgQueue[i].qty, PackingRule[r].itmqtyinfo[e]);
         }
         var RV=SizeVolume(PackingRule[r].pkgsize),  relRV=RV/minRV;
         var VE=MV/RV;                                          //volumetric-efficiency (Matching-Volume over Result-Volume)
         var g=VE/relRV;                                        //(**)modified volumetric-efficiency, to favour rule with smaller result-size
         if(g>bestGoodness) {P=r; bestGoodness=g;}              //--have found a new BEST rule P
      }
   }
   if(P==null) return false;    //--indicate NO matching rule found
   if(SZ!=null)  sRule= "PackingRule[" + P + "] is ONLY rule for sz:" + SizeStr(SZ) + "\n";
   else          sRule= "PackingRule[" + P + "] is BEST g:" + Math.round(bestGoodness*1000)/1000 + "\n";
   sRules+=sRule;
   //now apply rule P; first reducing qty or removing matched PkgQueue-entries, then adding an entry for the resulting pkg-size;
   var wei=0;
   for(var e=0; e<PackingRule[P].itmsizeinfo.length; ++e) for(var i=0; i<PkgQueue.length; ++i) if(SizeEQ(PackingRule[P].itmsizeinfo[e], PkgQueue[i].size)){
      var Q= Math.min(PkgQueue[i].qty, PackingRule[P].itmqtyinfo[e]);
      //wei+= PkgQueue[i].weight * Q;
      for(w=0; w<Q; ++w) {wei+= PkgQueue[i].wt[w]; PkgQueue[i].weight-= PkgQueue[i].wt[w];}
      PkgQueue[i].qty-= Q;
      if(PkgQueue[i].qty==0) RemovePkgQueueEntry(i);
      else                   PkgQueue[i].wt.splice(0, Q);
   }
   AddPkgQueueEntry(1, PackingRule[P].pkgsize, wei);
   return true;
}
sRule="";       //global var showing most recently applied PackingRule, for DEBUG purposes only
sRules="";      //global var showing which PackingRules were applied,   for DEBUG purposes only
//------------------------------------------------------------------------
// FUNCTION:  ComputePackageSize -- compute sum of item-sizes from global PkgQueue;
// such summing, not altogether straightforward, is known as the 3D Bin Packing Problem;
// RESULT:  global PkgQueue gets a simplified list of sub-packets;
//          global PkgAsOne describes the order as a single package;
// Algorithm:
// while any packingrule matches the item-sizes in PkgQueue do
//    pick and apply the best matching rule (see PickAndApplyPackingRule)
// done
//------------------------------------------------------------------------
function ComputePackageSize (ZoneParam){
   DEBUG2(ShowPkgQueue());
   var PR=PackTable[ZoneParam];
   if(PR.length>0){
      //---use Packing-Rules Method;
      // Condidered doing this twice with two sets of packing-rules:  BySz to get the smallest packages,  ByWt to get weight-limited packages;
      // (2nd would need to start with a copy of PkgQueue from before 1st; see System.arraycopy;  OR: better to construct new list in both steps)
      // but convinced myself that such complexity was not needed.  The ByWt rules will sometimes make the single-package bigger than optimal,
      // but only for an order of predominantly high-density items;  ergo, such a non-minimal package-size will never force a higher price;
      // and that likely holds for any user, any pkg-deliverer, or close enough...
      sRules="Zone:"+ShipTable[ZoneParam].zone+"\n";
      //==!!possibly add some sanity-checking on the PackingRules??
      while((PkgQueue.length>1 || (PkgQueue.length==1 && PkgQueue[0].qty>1)) && PickAndApplyPackingRule(PR)) DEBUG2(sRule+ShowPkgQueue());      //was: {}
      DEBUG1(sRules+"Packages:\n"+ShowPkgQueue());
   }
   //---use Crude Method, both in the absence of, and AFTER using PackingRules (to compute size as single package)
   var thk=0,  len=0,  wid=0,  wei=0;
   for(var i=0; i<PkgQueue.length; ++i){
      if(PkgQueue[i].size.Length > len) len = PkgQueue[i].size.Length;
      if(PkgQueue[i].size.width  > wid) wid = PkgQueue[i].size.width ;
      thk += PkgQueue[i].size.height * PkgQueue[i].qty;
      wei += PkgQueue[i].weight;
   }
   PkgAsOne = new Qszwt(1, new Size(len,wid,SzRnd(thk)), WtRndUP(wei));         //overall package size and weight (weight rounded up)
   //==!!NEEDED: Crude-Method, try placing several small items (LxW) into one layer, guided by package-size defns -- in case PackingRules omitted;
   //  OR: supply a script that reads a given set of HTML files, extracting items for sale, and then computes the PackingRules  (and make PackingRules required)
}
//------------------------------------------------------------------------
// FUNCTION: ComputeShipping -- compute the shipping cost for size and weight of package
//------------------------------------------------------------------------
function ComputeShipping (ZoneParam){
   sComputeShippingNote="";
   if(PkgAsOne.weight==0 && PkgAsOne.size.height==0) return 0.00;
   var Ship= ShipTable[ZoneParam].pkginfo;                      //Ship is array of PkgClass(weight,size,costfixed,costperwtunit,wtunit,flag)
   function PricePkg(Ship,weight,height){                       //function to lookup price for one pkg
      for(var c=0; c<Ship.length; ++c) if(weight<=Ship[c].weight && height<=Ship[c].size.height)
      {  return  Cents(Ship[c].costfixed + Ship[c].costperwtunit * Math.ceil(weight / Ship[c].wtunit)); }       //return shipping-price
      return 99999.99;                                                                                          //return illegal-weight-or-size indication
   }
   var asOne= PricePkg(Ship, PkgAsOne.weight, PkgAsOne.size.height);            //---compute price as a single package
   
   var asMult=99999.99,  FC=null,  iN=0;
   for(var c=0; c<Ship.length; ++c) if(Ship[c].flag=="*") FC=c;
   if(FC!=null){                                                                //---also price as multiple smaller packages (to handle pricing anomalies...)
      var maxHt=Ship[FC].size.height;
      var maxWt=Ship[FC].weight;
      var accHt=0,  accWt=0, sW="";  function R(f) {return " "+Math.ceil(f)+WTUNITS;}
      asMult=0;
      for(var i=PkgQueue.length; i--;) for(var j=PkgQueue[i].qty; j--;){        //do in reverse order (doing lightest ones first is best, at least for my examples:-)
         var Wt= PkgQueue[i].wt[j];
         var Ht= PkgQueue[i].size.height;
         if( Wt>maxWt || Ht>maxHt) {asMult=99999.99; break;}                    //having ByWt-packing, now treat this as "separate packages impossible"  !!double-break??
         if(accWt+Wt>maxWt || accHt+Ht>maxHt){                                  //handle previously accumulated little ones
            asMult+= PricePkg(Ship, accWt, accHt);  ++iN; sW+=R(accWt);
            accHt=0; accWt=0;
         }
         accWt+=Wt;  accHt+=Ht;                                                 //accumulate another little one
      }
      if(accWt+accHt){asMult+=PricePkg(Ship,accWt,accHt); ++iN; sW+=R(accWt);}  //finish off any non-handled accumulation
   }
   var asOneVat=  Cents(asOne *ShipTaxRate);
   var asMultVat= Cents(asMult*ShipTaxRate);
   asOne += asOneVat  + HandlingChargePerOrder;                                         //add HandlingCharges BEFORE comparing
   asMult+= asMultVat + HandlingChargePerOrder + (iN-1)*HandlingChargePerExtraPackage;  //add HandlingCharges BEFORE comparing
   var cost;
   if(asOne<=asMult){                                                                                                                   //as one package
      cost=asOne;  gVat=asOneVat;
   }else{                                                                                                                               //as multiple packages
      cost=asMult; gVat=asMultVat;
      if(strAsMultiple)sComputeShippingNote="("+strAsMultiple+sW+(strAsSingle?"; "+strAsSingle+MoneySymbol+moneyFormat(asOne):"")+")";  //sW+asOne can be suppressed...
   }
   if(cost>=99999) {sComputeShippingNote=strBroken;  return 99999.99;}
   return  cost;
   //
   //!!consider: keep info on the items within each packet, so can produce packing-instructions showing which items go into which size envelope (for the shipping dept)
}
//------------------------------------------------------------------------
// FUNCTION: NewZone -- update the ZoneSelected cookie
//------------------------------------------------------------------------
function NewZone (ZoneParam){
   SetCookie("ZoneSelected", ZoneParam, null, "/");
   var RegionCookie= iGetCookie("RegionSelected");
   if(RegionCookie!=null && RegionFromZone.length && !Element(RegionCookie, RegionFromZone[ZoneParam]))  DeleteCookie("RegionSelected","/");    //delete cookie if now illegal
   location.href=location.href;
}
//------------------------------------------------------------------------
// FUNCTION: NewRegion -- update the RegionSelected cookie
//------------------------------------------------------------------------
function NewRegion (RegionParam){
   SetCookie("RegionSelected", RegionParam, null, "/");
   var ZoneCookie= iGetCookie("ZoneSelected");
   if(ZoneCookie!=null && RegionFromZone.length && !Element(RegionParam, RegionFromZone[ZoneCookie]))  DeleteCookie("ZoneSelected","/");        //delete cookie if now illegal
   location.href=location.href;
}
//------------------------------------------------------------------------
// FUNCTION: MoreLessInfo -- do toggling-update to the MoreState cookie, for DynamicWtSzColumns option
//------------------------------------------------------------------------
function MoreLessInfo(){
   var MoreState=iGetCookie("MoreState");  if(MoreState==null) MoreState= (DisplayWtColumn?1:0)*2 + (DisplaySzColumn?1:0);
   MoreState= ((MoreState&DynamicWtSzColumns)==DynamicWtSzColumns ?0 :DynamicWtSzColumns);      //toggle Wt&Sz-state as per DynamicWtSzColumns option
   SetCookie("MoreState", MoreState, null, "/");                                                //update cookie
   location.href=location.href;                                                                 //redraw page
}


//========================================================================
// The rest still resembles the NopDesign version of nopcart.js (with some Stefko mods).
// ER: have revised ALL  parseFloat --> NumberZ (to permit whole or fractional number where fractional was needed)
// ER: have revised ALL  parseInt   --> Integer (new function that Rounds to whole-number, and avoids the leading-zero-means-octal gotcha)
// ER: introduced a few functions to reduce duplication, thus making future maintenance less tedious / error-prone
// ER: my other early revisions are flagged with a comment containing "ER:"  (later ones have a YYYY-MM-DD date instead)
// ER: after my Quantity-Discount Pricing mods (2007-08-07), any resemblance to the original is but faint
//========================================================================


//------------------------------------------------------------------------
// FUNCTION: NumberV
// PURPOSE: convert string to number, for CKquantity, CKprice routines
//------------------------------------------------------------------------
function NumberV(checkString) {
   var sNewString="", K=0;
   for(var i=0; i<checkString.length; ++i){
      ch = checkString.substring(i, i+1);
      if(ch>="0" && ch<="9")     sNewString += ch;      //keep all digits
      else if(ch=="." && ++K==1) sNewString += ch;      //ER: keep only the first dot
   }
   return(NumberZ(sNewString));
}
//------------------------------------------------------------------------
// FUNCTION: CKquantity
// PARAMETERS: Quantity to validate
// RETURNS: Quantity as a whole-number, but in a string
// PURPOSE: Make sure quantity is a whole-number
//------------------------------------------------------------------------
function CKquantity(checkString) {
   var N=Integer(NumberV(checkString));  if(N==0) N=1;  return(""+N);
}
//------------------------------------------------------------------------
// FUNCTION: CKprice
// PARAMETERS: Price to validate
// RETURNS: Price as a number, but in a string
// ER: introduced this routine to validate an Online-Donation amount;
//------------------------------------------------------------------------
function CKprice(checkString) {
   var N=Cents(NumberV(checkString));
   if(N==0) N=DefaultDonation;  else if(N<MinimumDonation) {N=MinimumDonation; alert(MinimumDonationPrompt);}
   return(moneyFormat(N));
}

//------------------------------------------------------------------------
// FUNCTION: AddToCart
// PARAMETERS: Form Object
// RETURNS: false if nothing added because of error-message
// PURPOSE: Add a product to the user's shopping cart, by updating Cookies, optionally with a popup prompt
//------------------------------------------------------------------------
function AddToCart(thisForm) {
   var iNumberOrdered = 0;
   var bAlreadyInCart = false;
   var notice = "";
   var ELE, ATR;
   ELE=thisForm;                                                                //Handle the old-style name=... value=... way of specifying attributes
   sID       = "";      if(ATR= ELE._ID || ELE.ID || ELE.ID_NUM ) sID      =ATR.value;          //2008-02-09 also support old name ID_NUM
   sQUANTITY = "1";     if(ATR= ELE._QUANTITY   || ELE.QUANTITY ) sQUANTITY=ATR.value;
   sPRICE    = "0.00";  if(ATR= ELE._PRICE      || ELE.PRICE    ) sPRICE   =ATR.value;
   sNAME     = "";      if(ATR= ELE._NAME       || ELE.NAME     ) sNAME    =ATR.value;
   sWEIGHT   = "0";     if(ATR= ELE._WEIGHT     || ELE.WEIGHT   ) sWEIGHT  =ATR.value;          //ER: was called sSHIPPING
   sLENGTH   = "0";     if(ATR= ELE._LENGTH     || ELE.LENGTH   ) sLENGTH  =ATR.value;          //ER: new
   sWIDTH    = "0";     if(ATR= ELE._WIDTH      || ELE.WIDTH    ) sWIDTH   =ATR.value;          //ER: new
   sHEIGHT   = "0";     if(ATR= ELE._HEIGHT     || ELE.HEIGHT   ) sHEIGHT  =ATR.value;          //ER: new
   sPROMPT   = "";                                                              //2008-01-21: a prompt-string from a selector
   for(var i=0;i<thisForm.elements.length;++i){                                 //2008-02-13: go thru hidden elements handling attrname=attrvalue
      ELE=thisForm.elements[i];
      if(ELE.type!="hidden") continue;
      if(!ELE.getAttribute)  continue;                                          //2008-03-10 skip if old browser that doesn't support getAttribute
      if(     ATR= ELE.getAttribute("_ID")      || ELE.getAttribute("ID_NUM")   ) sID      = ATR;       //avoid attribute named ID
      if(     ATR= ELE.getAttribute("_QUANTITY")|| ELE.getAttribute("QUANTITY") ) sQUANTITY= ATR;
      if(     ATR= ELE.getAttribute("_PRICE")   || ELE.getAttribute("PRICE")    ) sPRICE   = ATR;
      if(     ATR= ELE.getAttribute("_NAME")                                    ) sNAME    = ATR;       //avoid attribute named NAME
      if(     ATR= ELE.getAttribute("_WEIGHT")  || ELE.getAttribute("WEIGHT")   ) sWEIGHT  = ATR;
      if(     ATR= ELE.getAttribute("_LENGTH")  || ELE.getAttribute("LENGTH")   ) sLENGTH  = ATR;
      if(     ATR= ELE.getAttribute("_WIDTH")                                   ) sWIDTH   = ATR;       //avoid attribute named WIDTH
      if(     ATR= ELE.getAttribute("_HEIGHT")                                  ) sHEIGHT  = ATR;       //avoid attribute named HEIGHT
   }
   //sADDTLINFO= "";                                                            //2008-02-07: old ADDITIONALINFOn selectors yanked and replaced with new method below
   //if(thisForm.ADDITIONALINFO !=null) sADDTLINFO =         thisForm.ADDITIONALINFO [thisForm.ADDITIONALINFO.selectedIndex].value;
   //if(thisForm.ADDITIONALINFO2!=null) sADDTLINFO += "; " + thisForm.ADDITIONALINFO2[thisForm.ADDITIONALINFO2.selectedIndex].value;
   //if(thisForm.ADDITIONALINFO3!=null) sADDTLINFO += "; " + thisForm.ADDITIONALINFO3[thisForm.ADDITIONALINFO3.selectedIndex].value;
   //if(thisForm.ADDITIONALINFO4!=null) sADDTLINFO += "; " + thisForm.ADDITIONALINFO4[thisForm.ADDITIONALINFO4.selectedIndex].value;
   //if(thisForm.USERENTRY      !=null) sADDTLINFO += (sADDTLINFO?"; ":"") + thisForm.USERENTRY.value;  //ER: avoid leading semicolon
   //if(sADDTLINFO) sNAME+="; "+sADDTLINFO;//==TEMP==
                                                                                //2008-02-07:  new selectors with AddOneOfMany-features;  plus they can be Radio-buttons
   for(var N=0;N<=2;++N) for(var n=0;n<=9;++n){                                 //2008-02-07:  and they can supply Replacement OR To-Be-Added values (leading plus-sign)
      var selname=["ADDITIONALINFO","USERCHOICE","_USERCHOICE"][N] + (n?n:"");  //support  ADDITIONALINFOn  USERCHOICEn  _USERCHOICEn  for n=emptystring,1..9
      var selector=thisForm[selname];
      if(selector==null) continue;
      if(typeof selector.selectedIndex == "undefined"){                         //for a RADIO-button-selector need a loop testing the CHECKED-attribute
         for(var i=0;i<selector.length;++i) if(selector[i].checked) ELE=selector[i];
      }else{                                                                    //for a SELECT-box;  could use a loop testing the SELECTED-attribute
         ELE=selector[selector.selectedIndex];
      }
      function NewStr(OLD,NEW) {return    (NEW.substring(0,1)=="+" ?        OLD +        NEW.substring(1,NEW.length)  :NEW);}   //NewStr: plus-sign indicates catenation
      function NewNum(OLD,NEW) {return ""+(NEW.substring(0,1)=="+" ?NumberZ(OLD)+NumberZ(NEW.substring(1,NEW.length)) :NEW);}   //NewNum: plus-sign indicates addition

      if(!ELE.getAttribute)  if(ATR= ELE.value                                  ) sNAME    +=" "+ATR;                   //old-style here; 2008-03-18 only for old browser
      if(!ELE.getAttribute)  continue;                                                                                  //2008-03-10 skip if old browser w/o getAttribute

      if(     ATR= ELE.getAttribute("_ID")      || ELE.getAttribute("ID")       ) sID      = NewStr(sID,ATR);           //beware of attribute named ID
      else if(ATR=                                 ELE.getAttribute("ID_NUM")   ) sID      = NewStr(sID,ATR);           //support old name
      if(     ATR= ELE.getAttribute("_QUANTITY")|| ELE.getAttribute("QUANTITY") ) sQUANTITY= NewNum(sQUANTITY,ATR);     //possibly useful here??
      if(     ATR= ELE.getAttribute("_PRICE")   || ELE.getAttribute("PRICE")    ) sPRICE   = NewNum(sPRICE,ATR);
      if(     ATR= ELE.getAttribute("_NAME")                                    ) sNAME    = NewStr(sNAME,ATR); 
      else if(ATR= ELE.value                                                    ) sNAME   +=" "+ATR;                    //2008-03-18 old-style still here for new browser
      else if(ELE.type!="radio"  &&  (ATR=         ELE.getAttribute("NAME"))    ) sNAME    = NewStr(sNAME,ATR);         //beware of NAME; 2008-03-18 avoid on radio
      if(     ATR= ELE.getAttribute("_WEIGHT")  || ELE.getAttribute("WEIGHT")   ) sWEIGHT  = NewNum(sWEIGHT,ATR);
      if(     ATR= ELE.getAttribute("_LENGTH")  || ELE.getAttribute("LENGTH")   ) sLENGTH  = NewNum(sLENGTH,ATR);
      if(     ATR= ELE.getAttribute("_WIDTH")   || ELE.getAttribute("WIDTH")    ) sWIDTH   = NewNum(sWIDTH,ATR);        //beware of attribute named WIDTH
      if(     ATR= ELE.getAttribute("_HEIGHT")  || ELE.getAttribute("HEIGHT")   ) sHEIGHT  = NewNum(sHEIGHT,ATR);       //beware of attribute named HEIGHT
      if(     ATR= ELE.getAttribute("_PROMPT")  || ELE.getAttribute("PROMPT")   ) sPROMPT  += (sPROMPT?"; ":"")+ATR;
      //--note: for INPUT-TYPE=RADIO/HIDDEN the names NAME, ID, WIDTH, HEIGHT are not available, and that's why I went to _ID _NAME etc (briefly used PRODID PRODNAME)
      //but they work in SELECT-OPTION, so am leaving support for them;
      //2008-03-18: skip NAME on radio to avoid getting NAME=USERCHOICE;  also skip VALUE in new browser when _NAME present  (may need rethink??)
   }
   if(sID+sNAME=="" && sPROMPT=="") sPrompt="Please select an option";          //2008-01-21: (AddOneOfManyToCart uses sNAME=="selected")
   if(sPROMPT!="")  {alert(sPROMPT);  return false;}                            //2008-01-21: prompt, and avoid adding (null) product
   if(PrefEQ(sID,PrefDonation))  sPRICE=CKprice(sPRICE);                        //2008-02-04: validation for donation-amount (default & minimum)
   if(     ATR=thisForm._USERTEXT||thisForm.USERTEXT) {if(ATR.value)sNAME+= "; " + ATR.value;}          //2008-02-07: now directly onto sNAME  (was onto sADDTLINFO)
   else if(ATR=thisForm.USERENTRY)                    {if(ATR.value)sNAME+= "; " + ATR.value;}          //support old name

   //If this product already in the cart, then combine them instead of adding another.
   iNumberOrdered= iGetCookie("NumberOrdered",0);
   for(var i=1; i<=iNumberOrdered; ++i){
      GetRow(i);                                                //ER: get fields for row-i
      if(fields[0] == sID    &&
         fields[3] == sNAME  &&                                                 //2008-02-07 removed:  fields[8] == sADDTLINFO &&
        (fields[2] == sPRICE || PrefEQ(sID,PrefDonation))                       //2008-02-04: donations can be combined even when amount different
      ){                                                        //---already in cart, so combine;  ER: a match on all but PRICE deserves a DEBUG-alert?
         bAlreadyInCart = true;
         if(PrefEQ(sID,PrefDonation)){                          //donations are combined by summing amounts (new 2008-02-04)
            dbUpdatedOrder = sID + "|" +
               sQUANTITY + "|" +
               (Number(sPRICE)+Number(fields[2])) + "|" +
               sNAME     + "|" +
               sWEIGHT   + "|" +
               sLENGTH   + "|" +
               sWIDTH    + "|" +
               sHEIGHT;                                         //2008-02-07 removed:   + "|" +  sADDTLINFO;
         }else{                                                 //non-donations are combined by summing quantities
            dbUpdatedOrder = sID + "|" +
               (Integer(sQUANTITY)+Integer(fields[1])) + "|" +
               sPRICE    + "|" +
               sNAME     + "|" +
               sWEIGHT   + "|" +
               sLENGTH   + "|" +
               sWIDTH    + "|" +
               sHEIGHT;                                         //2008-02-07 removed:   + "|" + sADDTLINFO;
         }
         sNewOrder = "Order." + i;
         DeleteCookie(sNewOrder, "/");
         SetCookie(sNewOrder, dbUpdatedOrder, null, "/");
         notice = strAdded + "\n-------------------------------------\n" + strAddedQuantity + sQUANTITY + "\n" + strAddedProduct + sNAME;
         break;
      }
   }
   if(!bAlreadyInCart){                                         //---not in cart, so add it
      iNumberOrdered++;
      if(iNumberOrdered > 15) alert(strSorry);                  //limit nbr-rows in cart to 15;  ER: was 12  (the limit is 20 cookies for one domain)
      else {
         dbUpdatedOrder = sID + "|" +
            sQUANTITY + "|" +
            sPRICE    + "|" +
            sNAME     + "|" +
            sWEIGHT   + "|" +
            sLENGTH   + "|" +
            sWIDTH    + "|" +
            sHEIGHT;                                            //2008-02-07 removed:   + "|" + sADDTLINFO;
         sNewOrder = "Order." + iNumberOrdered;
         SetCookie(sNewOrder,       dbUpdatedOrder, null, "/");
         SetCookie("NumberOrdered", iNumberOrdered, null, "/");
         notice = strAdded + "\n-------------------------------------\n" + strAddedQuantity + sQUANTITY + "\n" + strAddedProduct + sNAME;
      }
   }
   if(DisplayPopupOnAdd && notice!="")  alert(notice);
   return true;
}


//------------------------------------------------------------------------
// FUNCTION: moneyFormat
// PARAMETERS: Number to be formatted
// RETURNS: Formatted Number
// PURPOSE: convert float to #.## string
// ER: first I rewrote this to something I could understand, since supporting MoneyPLACES option was unthinkable otherwise;
//------------------------------------------------------------------------
function moneyFormatFRA(input) {        //for any currency that uses a fraction, example US-dollars
   var cents= "" + Math.round(input * MoneyROUND_FRA);
   while(cents.length < MoneyPLACES+1)  cents="0"+cents;
   return  cents.substring(0, cents.length-MoneyPLACES) + "." + cents.substring(cents.length-MoneyPLACES, cents.length);
   //
   ////--ER: was:
   //var dollars= Math.floor(input);
   //var tmp= new String(input);
   //for(var decimalAt=0; decimalAt < tmp.length; decimalAt++){
   //   if(tmp.charAt(decimalAt)==".") break;
   //}
   //var cents= "" + Math.round(input * 100);
   //cents= cents.substring(cents.length-2, cents.length)
   //dollars += ((tmp.charAt(decimalAt+2)=="9")&&(cents=="00"))? 1 : 0;
   //if(cents=="0") cents = "00";
   //return  dollars + "." + cents;
}
function moneyFormatNOF(input) {        //ER: for a currency that uses no fraction (and may need rounding to a multiple of 1000 etc)
   return ""+Cents(input);
}
moneyFormat = (MoneyPLACES>0 ?moneyFormatFRA :moneyFormatNOF);  //ER: init function according to whether a fraction is needed  (MoneyPLACES indicates that)

//------------------------------------------------------------------------
// FUNCTION: SetCookie
// PARAMETERS: name, value, expiration date, path, domain, security
// RETURNS: Null
// PURPOSE: Store a cookie in the users browser
//------------------------------------------------------------------------
function SetCookie (name,value,expires,path,domain,secure) {
   document.cookie = CartID + name + "=" + escape (value) +
   ((expires) ? "; expires=" + expires.toGMTString() : "") +
   ((path) ? "; path=" + path : "") +
   ((domain) ? "; domain=" + domain : "") +
   ((secure) ? "; secure" : "");
}
//------------------------------------------------------------------------
// FUNCTION: DeleteCookie
// PARAMETERS: Cookie name, path, domain
// RETURNS: null
// PURPOSE: Remove a cookie from users browser.
//------------------------------------------------------------------------
function DeleteCookie (name,path,domain) {
   if(GetCookie(name)){
      document.cookie = CartID + name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
   }
}
//------------------------------------------------------------------------
// FUNCTION: getCookieVal
// PARAMETERS: offset
// RETURNS: URL unescaped Cookie Value
// PURPOSE: Get a specific value from a cookie
//------------------------------------------------------------------------
function getCookieVal (offset) {
   var endstr = document.cookie.indexOf (";", offset);
   if(endstr == -1)  endstr= document.cookie.length;
   return unescape(document.cookie.substring(offset, endstr));
}
//------------------------------------------------------------------------
// FUNCTION: GetCookie
// PARAMETERS: Name
// PURPOSE: Retrieve cookie from users browser
// RETURNS: Value in Cookie as a string,  or null if no such cookie exists
//------------------------------------------------------------------------
function GetCookie (name) {
   var arg = CartID + name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while(i < clen){
      var j = i + alen;
      if(document.cookie.substring(i, j)==arg)  return(getCookieVal(j));
      i = document.cookie.indexOf(" ", i) + 1;
      if(i == 0) break;
   }
   return(null);
}
//------------------------------------------------------------------------
// FUNCTION: iGetCookie
// PARAMETERS: Name, DEF
// PURPOSE: Retrieve an INTEGER cookie from users browser
// RETURNS: Value in Cookie as an Integer,  or DEF if no such cookie exists
//------------------------------------------------------------------------
function iGetCookie (name, DEF) {  if(DEF==null)DEF=null;  //if DEF is omitted, use null as DEF
   var r= GetCookie(name);
   return (r==null ?DEF :Integer(r));
}
//------------------------------------------------------------------------
// FUNCTION: FixCookieDate
// PARAMETERS: date
// RETURNS: date
// PURPOSE: Fix cookie date, store back in date
//------------------------------------------------------------------------
//function FixCookieDate (date) {
//   var base= new Date(0);
//   var skew= base.getTime();
//   date.setTime(date.getTime() - skew);
//}
//------------------------------------------------------------------------
// FUNCTION: GetRow
// PURPOSE: read one cart-row from the cookie-database
// RETURNS: global array fields, an array containing the fields
// NOTE: in the database-format, fields are separated by "|"
// ER: made this a function to improve maintainability.
//------------------------------------------------------------------------
function GetRow(i){
   RowKey = "Order." + i;
   dbrow = "";
   dbrow = GetCookie(RowKey);
   Token0 = dbrow.indexOf("|", 0);
   Token1 = dbrow.indexOf("|", Token0+1);
   Token2 = dbrow.indexOf("|", Token1+1);
   Token3 = dbrow.indexOf("|", Token2+1);
   Token4 = dbrow.indexOf("|", Token3+1);
   Token5 = dbrow.indexOf("|", Token4+1);
   Token6 = dbrow.indexOf("|", Token5+1);
   //ken7 = dbrow.indexOf("|", Token6+1);               //scrapped 2008-02-07
   fields = [];
   fields[0] = dbrow.substring(0,        Token0);       //Product-ID
   fields[1] = dbrow.substring(Token0+1, Token1);       //Quantity
   fields[2] = dbrow.substring(Token1+1, Token2);       //Price
   fields[3] = dbrow.substring(Token2+1, Token3);       //Product-Name
   fields[4] = dbrow.substring(Token3+1, Token4);       //Weight
   fields[5] = dbrow.substring(Token4+1, Token5);       //Length;       ER: new
   fields[6] = dbrow.substring(Token5+1, Token6);       //Width;        ER: new
   fields[7] = dbrow.substring(Token6+1, dbrow.length); //Height;       ER: new;                                2008-02-07 revised Token7-->dbrow.length
   //elds[8] = dbrow.substring(Token7+1, dbrow.length); //Addtl-Info;   ER: was fields[5] in NopDesign version  2008-02-07 yanked
}
//------------------------------------------------------------------------
// FUNCTION: RemoveFromCart
// PARAMETERS: Row Number to Remove
// RETURNS: Null
// PURPOSE: Remove an item from a users shopping cart
//------------------------------------------------------------------------
function RemoveFromCart(RemOrder) {
   if( (DisplayPopupOnRemove ? confirm(strRemove) : true) ){    //ER: suppress the confirm when DisplayPopupOnRemove==false
      NumberOrdered = iGetCookie("NumberOrdered",0);
      for(var i=RemOrder; i < NumberOrdered; ++i){
         NewOrder1 = "Order." + (i+1);
         NewOrder2 = "Order." + (i);
         database = GetCookie(NewOrder1);
         SetCookie (NewOrder2, database, null, "/");
      }
      NewOrder = "Order." + NumberOrdered;
      SetCookie ("NumberOrdered", (NumberOrdered>0?NumberOrdered-1:0), null, "/");
      DeleteCookie(NewOrder, "/");
      location.href=location.href;
   }
}
//------------------------------------------------------------------------
// FUNCTION: EmptyTheCart
// PURPOSE: Remove all items from a users shopping cart.
// Intended for a thanks-for-your-purchase page (that your payment-processor is instructed to return to),
// since after checkout one expects an empty cart...
//------------------------------------------------------------------------
function EmptyTheCart(){
   NumberOrdered = iGetCookie("NumberOrdered",0);
   for(var i=1; i <= NumberOrdered; ++i){
      NewOrder = "Order." + i;
      DeleteCookie(NewOrder, "/");
   }
   SetCookie("NumberOrdered", 0, null, "/");
}
//------------------------------------------------------------------------
// FUNCTION: ChangeQuantity
// PARAMETERS: Order Number to Change Quantity
// RETURNS: Null
// PURPOSE: Change quantity of an item in the shopping cart
//------------------------------------------------------------------------
function ChangeQuantity(OrderItem,NewQuantityParm) {
   var NewQuantity=Integer(NumberV(NewQuantityParm));           //2009-04-01: same rules as CKquantity
   if(NewQuantity==0) {alert(strErrQty); NewQuantity=1;}        //2009-04-01: same rules as CKquantity, but with message
   GetRow(OrderItem);           //ER: get fields for row-OrderItem
   dbUpdatedOrder = fields[0] + "|" +
      NewQuantity + "|" +
      fields[2]   + "|" +
      fields[3]   + "|" +
      fields[4]   + "|" +
      fields[5]   + "|" +
      fields[6]   + "|" +
      fields[7];                //2008-02-07 removed:  + "|" + fields[8];
   sNewOrder = "Order." + OrderItem;
   DeleteCookie(sNewOrder, "/");
   SetCookie(sNewOrder, dbUpdatedOrder, null, "/");
   location.href=location.href;
}
function ChangeQuantityIEkluge(e,OrderItem,NewQuantityParm) {   //2009-04-01: Eli Charne workaround for IE7 beeping on Enter
   if(window.event && e.keyCode==13){                           //if IE and Enter-key
      ChangeQuantity(OrderItem, NewQuantityParm);
      return false;
   }
   return true;
}
////------------------------------------------------------------------------
//// FUNCTION:  RadioChecked
//// PARAMETERS:  Radio button to check
//// RETURNS:   True if a radio has been checked
//// PURPOSE:   Form validation
//// ER: NOT USED
////------------------------------------------------------------------------
//function RadioChecked( radiobutton ) {
//   var bChecked = false;
//   var rlen = radiobutton.length;
//   for(var i=0; i < rlen; ++i)  if(radiobutton[i].checked)  bChecked = true;
//   return bChecked;
//}
////------------------------------------------------------------------------
//// FUNCTION: QueryString
//// PARAMETERS: Key to read
//// RETURNS: value of key
//// PURPOSE: Read data passed in via GET mode
//// ER: NOT USED
////------------------------------------------------------------------------
//QueryString.keys = [];
//QueryString.values = [];
//function QueryString(key) {
//   var value = null;
//   for(var i=0;i<QueryString.keys.length;++i){
//      if (QueryString.keys[i]==key) {
//         value = QueryString.values[i];
//         break;
//      }
//   }
//   return value;
//}
////------------------------------------------------------------------------
//// FUNCTION: QueryString_Parse
//// PARAMETERS: (URL string)
//// PURPOSE: Parse query string data;  must be called before QueryString
//// ER: NOT USED
////------------------------------------------------------------------------
//function QueryString_Parse() {
//   var query= window.location.search.substring(1);
//   var pairs= query.split("&");  for(var i=0;i>pairs.length;++i){
//      var pos = pairs[i].indexOf("=");
//      if (pos >= 0) {
//         var argname = pairs[i].substring(0,pos);
//         var value = pairs[i].substring(pos+1);
//         QueryString.keys[QueryString.keys.length] = argname;
//         QueryString.values[QueryString.values.length] = value;
//      }
//   }
//}


//------------------------------------------------------------------------
// FUNCTION: ReadCartComputePrices
// PURPOSE:  Read all rows from the cookies
// RETURNS:  globals iNumberOrdered, and Cart an array with Cart[i] being row-i;
// NOTE THAT:
//      Cart[i].ID        replaces all subsequent uses of  fields[0];
//      Cart[i].QUANTITY  replaces all subsequent uses of  fields[1]  OR  Integer(fields[1]);
//      Cart[i].PRICEAVG  replaces all subsequent uses of  fields[2]  OR  NumberZ(fields[2]);
//      Cart[i].NAME      replaces all subsequent uses of  fields[3];
//      Cart[i].WEIGHT    replaces all subsequent uses of  fields[4]  OR  NumberZ(fields[4]);
//      Cart[i].LENGTH    replaces all subsequent uses of  fields[5]  OR  NumberZ(fields[5]);
//      Cart[i].WIDTH     replaces all subsequent uses of  fields[6]  OR  NumberZ(fields[6]);
//      Cart[i].HEIGHT    replaces all subsequent uses of  fields[7]  OR  NumberZ(fields[7]);
//      Cart[i].ADDTLINFO replaces all subsequent uses of  fields[8]  <-- scrapped 2008-02-07
//      Cart[i].PRICE     is the entire string from Form.PRICE; but should never be needed outside of this routine;
// Form.PRICE now consists of comma-separated terms such as:
//      3.95                      -- means 3.95 each
//      3.95,2:3.00               -- means 3.95 for the first, 2nd and subsequent are 3.00 each;
//      3.95,10=2.99              -- means 3.95 each, or exactly 10 for 29.90;
//      3.95,10=2.99,10:2.99      -- means 3.95 each, 10 or more are 2.99 each;
//      3.95,2:3.00,4:2.75,8:2.50 -- means 2nd...are 3.00, 4th...are 2.75, 8th and subsequent are 2.50;
//      3.95,2:-30,GRP01          -- means 2nd and subsequent are 30% off, and this applies across all products in the group GRP01;
//      can have any number of ":" or "=" terms, at most one starting with a letter to name a group;
//      ":" and "=" terms may be interspersed, or not, but the ":" terms must appear in increasing order by left-side, and "=" terms likewise;
//      RESTRICTION: exact-quantity ("=") pricing is only permitted within a group where all products have identical prices;
//      anything else would be so bloody hard to explain, it's hard to see anyone wanting it;
// ER: All-at-once reading is essential for a reasonably efficient implementation of Quantity-Discount Pricing,
//      since several passes are needed to compute prices, and those are needed before the pass that displays & does payment-processing;
//      (more than one preliminary pass is needed to support Product-Groups);
// ER: also moved the Shipping & Tax calculation code here, from ManageCart/CheckoutCart, setting globals: fTotal, fShipping, fTax, ZoneSelected, RegionSelected,
//      to further reduce duplication thus lessening the tedium & error-proneness of making modifications.
// Q: To get deterministic n-or-more pricing, independent of the order items added to cart, could sort by price within group?
// 2007-12-04: now applying Cents-rounding to PRICEAVG on the assumption that payment-processors can't handle more fractional digits than is the currency norm;
// 2008-02-03: now applying Cents-rounding to PRICEAVG earlier (here) so that amounts shown by ViewCart will agree with what PayPal etc will be displaying;
//------------------------------------------------------------------------
function ReadCartComputePrices(){
   var Dig="0123456789", Lwr="abcdefghijklmnopqrstuvwxyz", Upr="ABCDEFGHIJKLMNOPQRSTUVWXYZ", Let=Lwr+Upr;       //constants for Is-testing
   function Is(c,pat) {return pat.indexOf(c)!=-1;}
   var i, k;
   var KK=-1;                                   //row-nbr for Coupon-discount
   var C, G, D, X, K;                           //results from the Pparse routine
   function Pparse(priceparm){                  //the Pparse PRICE-parsing routine
      C=0; G=""; D=[]; X=[]; K=null;
      if(priceparm.substring(0,2)==">="){       //a coupon (2008-03-06)
         var x=priceparm.substring(2).split(":"), y=x[1].indexOf("%"); if(y==-1)y=x[1].length;
         K= {min:NumberZ(x[0]), amt:NumberZ(x[1].substring(0,y)), pct:x[1].substring(y)};
         //alert("min:"+K.min+"; amt:"+K.amt+"; pct:"+K.pct+";");
      }else for(var price=priceparm.split(","), J=0; J<price.length; ++J){
         var T=price[J];
         if(     T.indexOf("=")!=-1)            {var x=T.split("="); X.push( {q:Integer(x[0]), p:NumberZ(x[1])} );}
         else if(T.indexOf(":")!=-1)            {var x=T.split(":"); D.push( {q:Integer(x[0]), p:NumberZ(x[1])} );}
         else if(Is(T.substring(0,1),Let))      G=T;
         else                                   C=NumberZ(T);
      }
   }
   //====read all rows from the cookies====
   Cart = [];                                           //init global Cart array
   iNumberOrdered=iGetCookie("NumberOrdered",0);        //get the nbr-rows-in-cart cookie
   for(i=1; i<=iNumberOrdered; ++i){
      GetRow(i);                                        //get fields for row-i
      Pparse(fields[2]);                                //parse the PRICE string
      Cart[i]= {
         ID:               fields[0], 
         QUANTITY: Integer(fields[1]), 
         PRICE:            fields[2], 
         NAME:             fields[3], 
         WEIGHT:   NumberZ(fields[4]), 
         LENGTH:   NumberZ(fields[5]), 
         WIDTH:    NumberZ(fields[6]), 
         HEIGHT:   NumberZ(fields[7]), 
         //DTLINFO:        fields[8],                   //2008-02-07 scrapped ADDTLINFO aka fields[8]
         C:C, G:G, D:D, X:X, K:K, PRICEAVG:null         //the parsed-price fields; consider using ID as G if no group specified(?)
      }
   }
   //====compute prices====
   for(i=1; i<=iNumberOrdered; ++i){
      if(Cart[i].PRICEAVG!=null) continue;                                      //skip if row already done (due to groups)
      C=Cart[i].C;  G=Cart[i].G;  D=Cart[i].D;  X=Cart[i].X;  K=Cart[i].K;      //info from Pparse
      function eEQ(A,B) {return A.q==B.q && A.p==B.p;}                                                                                  //compare q-p elements
      function aEQ(A,B) {if(A.length!=B.length)return false; for(var k=A.length;k--;)if(!eEQ(A[k],B[k]))return false; return true;}     //compare array of q-p elements
      function pEQ(A,B) {return A.C==B.C && aEQ(A.D,B.D) && aEQ(A.X,B.X);}                                                              //compare parsed prices
      function str(X) {var s="["; for(var i=0;i<X.length;++i)s+="{"+X[i].q+","+X[i].p+"},"; s+="]"; return s;}  //convert X or D to string
      function pp(P)  {return (P>=0 ?P :C*(100+P)/100);}                                                        //convert negative price to a percent-off-wrt-C price
      var q=Cart[i].QUANTITY;                                                                           //q is qty of this product
      var Q=q;   if(G!="")for(Q=0, k=1; k<=iNumberOrdered; ++k) if(Cart[k].G==G) Q+= Cart[k].QUANTITY;  //Q is qty across all products in this group
      var g=[i]; if(G!="")for(g=[],k=1; k<=iNumberOrdered; ++k) if(Cart[k].G==G) g.push(k);             //g is array of indices for rows in this group
      var ix=-1; for(k=X.length; k--;) if(X[k].q<=Q) {ix=k; break;}             //find the biggest applicable exact-qty ("=") discount;  requires ordered terms
      var id=-1; for(k=D.length; k--;) if(D[k].q<=Q) {id=k; break;}             //find the biggest applicable n-or-more (":") discount;  requires ordered terms
      DEBUG4("row:"+i+" itm:"+Cart[i].ID+" PRICE:"+Cart[i].PRICE+" C:"+C+" G:"+G+" X:"+str(X)+" D:"+str(D)+" g:"+g+" ix:"+ix+" id:"+id);
      if(X.length>0){
       //var m=[];for(k=g.length;k--;)if(Cart[g[k]].PRICE!=Cart[i].PRICE)m.push(g[k]);  //sanity-check prices across group, using simple string-comparisons
         var m=[];for(k=g.length;k--;)if(!pEQ(Cart[g[k]], Cart[i]))m.push(g[k]);        //sanity-check prices across group, comparing C,D,X to permit minor differences
         if(m.length>0) DEBUG("group:"+G+" has exact-qty discount but PRICE on row:"+i+" conflicts with rows:"+m);      //issue DEBUG alert
         if(m.length>0) {for(k=g.length; k--;) Cart[g[k]].PRICEAVG=C;  continue;}       //suppress further such DEBUG alerts for the other rows in group
      }
      var A, QQ, q2, I;
      if(K){                                                                    //---a Coupon-Discount, will be applied later (2008-03-06)---
         Cart[i].QUANTITY=1;                                                    //override quantity, forcing it to be one
         Cart[i].PRICEAVG=0;                                                    //set price-apiece to zero, until we find out if qualifications are met
         KK=i;
      }else if(ix!=-1){                                                         //---apply an exact-quantity discount, or both kinds, to all rows in group---
         A=0;  QQ=Q;
         while(Q!=0){                                                           //until all items in group are priced or no more applicable exact-discounts
            q2= Math.floor(Q / X[ix].q) * X[ix].q;                              //q2 is the largest multiple of X[ix].q that's less-than-or-equal-to Q
            A += q2*pp(X[ix].p);  Q-=q2;                                        //sell q2 at price X[ix].p, revising Q to reflect remaining qty
            DEBUG4("sell "+q2+" at:"+pp(X[ix].p)+" Q:"+Q);
            --ix; while(ix>=0 && X[ix].q>Q) --ix;                               //revise ix for the next applicable exact-discount, if any
            if(ix==-1)break                                                     //leave loop if none
            if(id!=-1 && pp(D[id].p)<pp(X[ix].p))break;                         //2008-03-01 leave if the n-or-more price beats next applicable exact-discount price
         }
         if(Q>0) A += Q * (id!=-1 ? pp(D[id].p) :C);                            //price the rest using the applicable n-or-more-price, or C if none
         var priceavg= Cents(A/QQ);                                             //2008-02-03: was Cents(A) / QQ
         for(k=g.length; k--;)  {I=g[k];  Cart[I].PRICEAVG = priceavg;}         //each row in group gets the same price apiece

      }else if(id!=-1){                                                         //---apply an n-or-more discount, to all rows in group---
         var ID, QD=0;                                                          //QD is the count of items already priced
         for(k=0; k<g.length; ++k){  I=g[k];                                    //for each row I in group do
            A=0; q=Cart[I].QUANTITY; C=Cart[I].C;  D=Cart[I].D;
            if(D.length==0 || D[0].q!=1)  D.unshift( {q:1, p:C} );              //augment D to include a price for the first one(s), to simplify search-loops, etc
            while(q>0){
               for(ID=0;;++ID) if(ID+1==D.length||QD+1<D[ID+1].q)break;         //now D[ID].p is the price for the QD+1'th (next) item
               q2=q;  if(ID+1<D.length) q2=Math.min(q, D[ID+1].q-1-QD);         //q2 is nbr of items to sell at price D[ID].p
               A+= q2*pp(D[ID].p);  QD+=q2;  q-=q2;                             //sell q2 items at D[ID].p, revising QD & q
               DEBUG4("sell "+q2+" at:"+pp(D[ID].p)+" ID:"+ID+" QD:"+QD);
               if(q2<=0) {DEBUG("ReadCartComputePrices is broken"); break;}
            }
            Cart[I].PRICEAVG = Cents(A / Cart[I].QUANTITY);                     //price apiece;  2008-02-03: was Cents(A) / Cart[I].QUANTITY
         }
      }else{                                                                    //---apply constant price to one row---
         Cart[i].PRICEAVG = Cents(C);                                           //price apiece;  2008-02-03: was C
      }
   }
   if(KK!=-1){                                                                  //---now apply a Coupon-Discount, if any (2008-03-06)---
      for(fTotal=0, i=1; i<=iNumberOrdered; ++i) fTotal+=Cart[i].QUANTITY*Cart[i].PRICEAVG;             //need the pre-tax pre-shipping subtotal, to see if applicable
      K=Cart[KK].K;
      if(fTotal>=K.min) Cart[KK].PRICEAVG= (K.pct ?fTotal*K.amt/100 : -Math.min(-K.amt,fTotal));        //if applicable, compute the (negative) amount of discount
      AllInOne=true;                                                                                    //2008-03-09 because Paypal cant handle negative price (Google?)
   }
   //====total, shipping, tax calculations====
   ZoneSelected=  iGetCookie("ZoneSelected");   ZoneChecked=ZoneSelected;                               //get zone cookie
   RegionSelected=iGetCookie("RegionSelected"); RegionChecked=RegionSelected;                           //ER: get region cookie
   if(ZoneSelected==null) ZoneSelected=ZoneDefault;                                                             //use zone-default if none selected;  ER: default was 8
   if(RegionFromZone.length && RegionSelected==null)       RegionSelected=RegionFromZone[ZoneSelected][0];      //ER: use RegionFromZone option to set RegionSelected
   if(RegionFromZoneOverrides)                             RegionSelected=RegionFromZone[ZoneSelected][0];
   if(ZoneChecked!=null && RegionFromZoneOvA[ZoneChecked]) RegionSelected=RegionFromZone[ZoneChecked] [0];
   if(RegionSelected==null)                                RegionSelected=RegionDefault;                //ER: use region-default, when RegionFromZone not being used
   if(RegionFromZone.length && !Element(RegionSelected,RegionFromZone[ZoneSelected])){                  //ER: validity-check, the Zone+Region combination is invalid:
      if(ZoneChecked!=null || RegionChecked==null){                                                     //ER: if user has picked Zone or neither, then revise Region
         RegionSelected=RegionFromZone[ZoneSelected][0];                                                //ER: revise RegionSelected to make it legal for Zone
      }else{                                                                                            //ER: otherwise, revise Zone to achieve consistency
         for(var Z=RegionFromZone.length;Z--;) if(Element(RegionSelected, RegionFromZone[Z])) break;    //ER: find a valid Zone Z
         if(Z>=0) ZoneSelected=Z;  else DEBUG("RegionFromZone option is invalid");                      //ER: revise ZoneSelected to make it legal for Region
      }
   }
   if(RegionChecked!=null) RegionChecked= RegionSelected;                                               //ER: validity-check RegionChecked
   if(ZoneChecked  !=null) ZoneChecked  = ZoneSelected;                                                 //ER: validity-check ZoneChecked
   if(RegionsUsed && RegionPrompt!="" && !RegionFromZoneOverrides && !(ZoneChecked!=null && RegionFromZoneOvA[ZoneChecked])
   ) {}                                                                                                 //ER: leave Region unchecked if user will have to pick
   else RegionChecked=RegionSelected;                                                                   //ER: show as checked a Region that suffices
   if(ShipTable.length>1 && ZonePrompt!="" && !(RegionChecked!=null && ZoneFromRegionOvA[RegionChecked])
   ) {}                                                                                                 //ER: leave Zone unchecked if user will have to pick
   else ZoneChecked=ZoneSelected;                                                                       //ER: show as checked a Zone that suffices
   //--ER: original version of above was ok for customer selecting Zone first, but would seriously harrass customer trying to select Region before Zone;
   // have fixed:  (2) revised validity-checking above;  and reordered, so setting Checked by PromptNotNeeded is done last, and for Zone after Region;
   // have fixed:  (3) NewZone routine now deletes Region-cookie if illegal;  NewRegion now deletes Zone-cookie if illegal;  (1) was to revise such cookie;
   //                  can continue to regard the presence of a Zone or Region cookie as proof the user has selected (and it hasn't been altered since);
   InitPkgQueue();                                                                      //ER: initialize the PkgQueue object (used to compute package-size)
   fTotal=0; fTaxA=[]; for(R=0;R<RegionTable.length;++R)fTaxA[R]=0; g_TotalQty=0;       //initialize subtotal and tax-subtotals
   var taxnbrs=TaxesByRegion[RegionSelected] || [];                                     //lookup which taxes apply based on RegionSelected
   var taxrate=[]; for(T=0;T<TaxRates.length;++T)taxrate[T]=0;
   for(N=0;N<taxnbrs.length;++N)taxrate[taxnbrs[N]]=TaxRates[taxnbrs[N]];               //ER: init taxrates based on RegionSelected
   for(i=1; i<=iNumberOrdered; ++i){
      //ER: considered using TaxableTotal etc, so as to multiply just once;  not essential, provided the rounding-to-cents is deferred  (tho for tax-included it isn't)
      var ProdID=Cart[i].ID, QP=Cart[i].QUANTITY*Cart[i].PRICEAVG, taxX=null; tax=[], taxsum=0;
      for(pref in TaxesByID) if(typeof TaxesByID[pref]!=="function") if(PrefEQ(ProdID,pref)) {taxX=TaxesByID[pref]; break;}     //is product subject to a tax-exception?
      if(taxX) {for(T=0;T<TaxRates.length;++T)tax[T]=0; for(K=taxX.length;K--;) {T=taxX[K]; tax[T]=QP*taxrate[T];}}             //if so, only taxes in taxX apply
      else     {for(T=0;T<TaxRates.length;++T)tax[T]=QP*taxrate[T];}                                                            //otherwise all taxes apply
      if(DisplayTaxIncluded){                                                           //ER: for tax-included pricing:
         for(T=0;T<TaxRates.length;++T) {tax[T]=Cents(tax[T]); taxsum+=tax[T];}         //each tax is rounded to cents for each row, and
         Cart[i].PRICEAVG += taxsum / Cart[i].QUANTITY;                                 //the price-apiece is adjusted to include taxes
      }
      AddPkgQueueEntry(Cart[i].QUANTITY, new Size(Cart[i].LENGTH,Cart[i].WIDTH,Cart[i].HEIGHT), Cart[i].WEIGHT);        //ER: accumulate for package-size
      fTotal+=Cart[i].QUANTITY*Cart[i].PRICEAVG;                                        //accumulate fTotal, the subtotal before (tax)+shipping...
      for(T=0;T<TaxRates.length;++T) fTaxA[T]+=tax[T];                                  //accumulate tax-subtotals
      g_TotalQty+=Cart[i].QUANTITY;                                                     //accumulate total-quantity
   }
   ComputePackageSize(ZoneSelected);                                                    //ER: compute package-size
   fShipping = ComputeShipping(ZoneSelected);                                           //ER: removed if-else since function handles weight being zero
   ppTotal=fTotal; ppShipping=fShipping; if(ppTotal==0) {ppTotal=moneyEps; ppShipping=Math.max(ppShipping-moneyEps,0);} //2008-02-09 kludge because PayPal chokes on zero
   if(ShipTaxAsItems && !DisplayTaxIncluded){                                           //2009-03-28: shipping taxed at same rate as items, shown in fTax (eg: NY-state)
      for(T=0;T<TaxRates.length;++T) fTaxA[T]+= fTaxA[T]/ppTotal * fShipping;           //2009-03-28: rate same as on items, shown in fTax
   }
   for(T=0;T<TaxRates.length;++T) fTaxA[T]=Cents(fTaxA[T]);                             //ER: round to Cents separately
   fTax=0; if(!DisplayTaxIncluded) for(T=0;T<TaxRates.length;++T) fTax+=fTaxA[T];       //ER: fTax is sum of taxes, however with tax-included pricing use zero
   g_TotalCost = fTotal + fShipping + fTax;                                             //compute grand-total  ==Rename needed: fTotal->fSubTot, g_TotalCost->fTotal==
}


//------------------------------------------------------------------------
// FUNCTION: AddPaymentProcessorFieldsForOneRow
// RECEIVES: PP is the payment-processor-code;
//           i is the row-nbr, Cart[i] is the info about that row
// RETURNS: appends to global string vars  sOutPP and sDescAIO
// ER: made this a function to improve maintainability.
//------------------------------------------------------------------------
function AddPaymentProcessorFieldsForOneRow(PP, i){
   //if(Cart[i].QUANTITY<=0) return;                                                    //2009-04-01: Eli Charne: skip qty:zero;  ER: fixed ChangeQuantity instead
   var sN="";     if(AppendItemNumToOutput) sN=""+i;                                    //ER: convert i to string once
   var SEP="\n";  if(PP=="ap"||PP=="pp") SEP="; ";                                      //2008-10-15 separator between items in the All-in-one-Description
   var ProdNAME = Cart[i].NAME;                                                         //2008-02-07 removed: +(Cart[i].ADDTLINFO ?"; "+Cart[i].ADDTLINFO :"")
   var Notes="";
   if(i==iNumberOrdered && NotesOnItem){                                                //2008-02-04 Notes onto last item;  2008-10-15 for any PP, was pp-only
      Notes+= SEP;
      Notes+= (ShipTable[ZoneSelected].zone?strSHIP+" "+ShipTable[ZoneSelected].zone:"");       //show selected-Zone
      Notes+= (sComputeShippingNote?" ":"")+sComputeShippingNote;                               //show notes about multiple-packages etc
      Notes+= (RegionsUsed?", "+RegionTable[RegionSelected]:"");                                //2008-10-15 also show selected-Region
   }
   if(PP=="an"||PP=="wp"||PP=="lp"||PP=="ap"||PP=="vt")  AllInOne=true;                 //an/wp/lp/ap/vt are always all-in-one
   if(PP=="gc"||PP=="is")                                AllInOne=false;                //gc/is together with AllInOne not supported
   if(AllInOne){                                                                        //===an/wp/lp/ap/vt/pp+AllInOne===
      sDescAIO+= Cart[i].ID + ", " + ProdNAME + ", Qty:"+Cart[i].QUANTITY + Notes + (i<iNumberOrdered?SEP:"");  //format Description as: ID, NAME, Qty:QUANTITY<sep>  (an/wp/lp used to get an ending SEP)
   }
   ProdNAME+=Notes;
   if(PP=="pp" && (!AllInOne || i==iNumberOrdered)){                                    //===PayPal-cart-based OR PayPal-all-in-one AND last-item===
      var ppNAME= (AllInOne ?sDescAIO :ProdNAME);
      var ppNAME1=ppNAME.substring(0,127);                                              //ER: break into 3 strings according to PayPal limits
      var ppNAME2=ppNAME.substring(127,327);                                            //ER: break into 3 strings according to PayPal limits
      var ppNAME3=ppNAME.substring(327,527);                                            //ER: break into 3 strings according to PayPal limits
      var ppID=Cart[i].ID, ppPRICE=Cart[i].PRICEAVG, ppQUANTITY=Cart[i].QUANTITY;
      if(AllInOne) {ppID="AIO"; ppPRICE=ppTotal; ppQUANTITY=1;}                         //2008-03-09 for PayPal-all-in-one, supply the subtotal as the price
      if(AllInOne && AppendItemNumToOutput) sN=""+1;                                    //2008-03-09 for PayPal-all-in-one, use one as the row-number
      sOutPP+=             "<input type=hidden name=\"item_number_"+sN+"\" value=\""+             ppID              + "\">";
      sOutPP+=             "<input type=hidden name=\"item_name_"  +sN+"\" value=\""+             ppNAME1           + "\">";
      sOutPP+=             "<input type=hidden name=\"amount_"     +sN+"\" value=\""+ moneyFormat(ppPRICE)          + "\">";
      sOutPP+=             "<input type=hidden name=\"quantity_"   +sN+"\" value=\""+             ppQUANTITY        + "\">";
      if(ppNAME2) sOutPP+= "<input type=hidden name=\"on0_"        +sN+"\" value=\""+             "Info2"           + "\">";
      if(ppNAME2) sOutPP+= "<input type=hidden name=\"os0_"        +sN+"\" value=\""+             ppNAME2           + "\">";
      if(ppNAME3) sOutPP+= "<input type=hidden name=\"on1_"        +sN+"\" value=\""+             "Info3"           + "\">";
      if(ppNAME3) sOutPP+= "<input type=hidden name=\"os1_"        +sN+"\" value=\""+             ppNAME3           + "\">";
   }else if(PP=="gc"){                                                                  //===Google-Checkout-cart-based===
      sOutPP+= "<input type=hidden name=\"item_name_"              +sN+"\" value=\""+             Cart[i].ID        + "\">";
      sOutPP+= "<input type=hidden name=\"item_description_"       +sN+"\" value=\""+             ProdNAME          + "\">";
      sOutPP+= "<input type=hidden name=\"item_price_"             +sN+"\" value=\""+ moneyFormat(Cart[i].PRICEAVG) + "\">";
      sOutPP+= "<input type=hidden name=\"item_quantity_"          +sN+"\" value=\""+             Cart[i].QUANTITY  + "\">";
      sOutPP+= "<input type=hidden name=\"item_currency_"          +sN+"\" value=\""+             gcCurrency        + "\">";
   }else if(PP=="is"){                                                                  //===InternetSecure-cart-based===
      if(i==1) sOutPP+= "<input type=hidden name=\"Products\" value=\"Price::Qty::Code::Description::Flags";     //first item is preceded by "Defining"-record
      sOutPP+="|"+moneyFormat(Cart[i].PRICEAVG)+"::"+Cart[i].QUANTITY+"::"+Cart[i].ID+"::"+ProdNAME+"::"+isFlags;//see https://www.internetsecure.com/merchants/ShowPage.asp?page=APSM&q=1
   }else if(PP=="cgi"){                                                                 //===CUSTOM-cgi-payment-processor===  was if(HiddenFieldsToCheckout)
      sOutPP+= "<input type=hidden name=\"" + OutputItemId         +sN+"\" value=\""+             Cart[i].ID        + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemQuantity   +sN+"\" value=\""+             Cart[i].QUANTITY  + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemPrice      +sN+"\" value=\""+ moneyFormat(Cart[i].PRICEAVG) + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemName       +sN+"\" value=\""+             Cart[i].NAME      + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemWeight     +sN+"\" value=\""+             Cart[i].WEIGHT    + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemLength     +sN+"\" value=\""+             Cart[i].LENGTH    + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemWidth      +sN+"\" value=\""+             Cart[i].WIDTH     + "\">";
      sOutPP+= "<input type=hidden name=\"" + OutputItemHeight     +sN+"\" value=\""+             Cart[i].HEIGHT    + "\">";
      //utPP+= "<input type=hidden name=\"" + OutputItemAddtlInfo  +sN+"\" value=\""+             Cart[i].ADDTLINFO + "\">";    //yanked 2008-02-07
   }
}
//------------------------------------------------------------------------
// FUNCTION: AddPaymentProcessorFieldsFinal
// RECEIVES: PP is the payment-processor-code;  global var sDescAIO is the all-in-one-description
// RETURNS: appends to global string var  sOutPP
// ER: made this a function to improve maintainability.
//------------------------------------------------------------------------
function AddPaymentProcessorFieldsFinal(PP){
   if(PP=="an"){                                        //===an:Authorize.net WebConnect===
      sOutPP += "<input type=hidden name=\"x_version\"       value=\"3.1\">";                   //2009-04-18: 3.0-->3.1
      sOutPP += "<input type=hidden name=\"x_show_form\"     value=\"PAYMENT_FORM\">";
      sOutPP += "<input type=hidden name=\"x_description\"   value=\""+ sDescAIO + "\">";
      sOutPP += "<input type=hidden name=\"x_amount\"        value=\""+ moneyFormat(fTotal + fShipping + fTax) + "\">";
   }else if(PP=="wp"){                                  //===wp:WorldPay===
      sOutPP += "<input type=hidden name=\"desc\"            value=\""+ sDescAIO + "\">";
      sOutPP += "<input type=hidden name=\"amount\"          value=\""+ moneyFormat(fTotal + fShipping + fTax) + "\">";
   }else if(PP=="lp"){                                  //===lp:LinkPoint===
      sOutPP += "<input type=hidden name=\"mode\"            value=\"fullpay\">";
      sOutPP += "<input type=hidden name=\"chargetotal\"     value=\""+ moneyFormat(fTotal + fShipping + fTax) + "\">";
      sOutPP += "<input type=hidden name=\"tax\"             value=\""+ MoneySymbol + moneyFormat(fTax) + "\">";
      sOutPP += "<input type=hidden name=\"subtotal\"        value=\""+ MoneySymbol + moneyFormat(fTotal) + "\">";
      sOutPP += "<input type=hidden name=\"shipping\"        value=\""+ MoneySymbol + moneyFormat(fShipping) + "\">";
      sOutPP += "<input type=hidden name=\"desc\"            value=\""+ sDescAIO + "\">";
   }else if(PP=="vt"){                                  //===vt:VirtualTerminalNetwork===
      sOutPP += "<input type=hidden name=\"item_name\"       value=\""+ sDescAIO + "\">";
      sOutPP += "<input type=hidden name=\"amount\"          value=\""+ moneyFormat(fTotal + fShipping + fTax) + "\">";
   }else if(PP=="ap"){                                  //===ap:AlertPay (2008-10-15; DROPPED 2010-03-21)===
      sOutPP += "<input type=hidden name=\"ap_purchasetype\"    value=\""+ "item"   + "\">";
      sOutPP += "<input type=hidden name=\"ap_itemname\"        value=\""+ "cart"   + "\">";
      sOutPP += "<input type=hidden name=\"ap_description\"     value=\""+ sDescAIO + "\">";
      sOutPP += "<input type=hidden name=\"ap_quantity\"        value=\""+ "1"      + "\">";
      sOutPP += "<input type=hidden name=\"ap_amount\"          value=\""+ moneyFormat(fTotal)    + "\">";
      sOutPP += "<input type=hidden name=\"ap_shippingcharges\" value=\""+ moneyFormat(fShipping) + "\">";
      sOutPP += "<input type=hidden name=\"ap_taxamount\"       value=\""+ moneyFormat(fTax)      + "\">";
      sOutPP += "<input type=hidden name=\"ap_totalamount\"     value=\""+ moneyFormat(fTotal + fShipping + fTax) + "\">";
        //field apc_1..apc_6  each limited to 100-chars
        //field ap_description -- no info provided on max-length but tested successfully with more than 2000-characters;  2010-03-21: is now max 150-chars!!
        //field ap_discountamount - may be useful to get around negative-amount kluges?
        //NOTE: fields ap_currency, ap_merchant must be supplied in the view-cart page
   }else if(PP=="pp"){                                  //===pp:PayPal (cart-based OR all-in-one)===
      //var ShpTaxNotes="Shipping+Tax-Notes: "+ShipTable[ZoneSelected].zone+" "+sComputeShippingNote+(RegionsUsed?" "+RegionTable[RegionSelected]:"");  //==OBSOLETE
      sOutPP += "<input type=hidden name=\"cmd\"             value=\"_cart\">";                         //2008-02-05: new
      sOutPP += "<input type=hidden name=\"upload\"          value=\"1\">";                             //2008-02-05: new
      //utPP += "<input type=hidden name=\"custom\"          value=\""+ ShpTaxNotes             +"\">"; //shipping+tax-notes via "custom" don't show on emails ==OBSOLETE
      sOutPP += "<input type=hidden name=\"tax_cart\"        value=\""+ moneyFormat(fTax)       +"\">";
      sOutPP += "<input type=hidden name=\"handling_cart\"   value=\""+ moneyFormat(ppShipping) +"\">"; //2008-02-09 ppShipping for the zero-subtotal kludge
      sOutPP += "<input type=hidden name=\"no_note\"         value=\""+ "1"                     +"\">"; //use NO_NOTE until PayPal fixes NOTE/SpecialInstructions-support
   }else if(PP=="gc"){                                  //===gc:GoogleCheckout===
      if(fTax!=0){                                                              //Google forces us to supply TAX as an item...
        var sN=""+(iNumberOrdered+1);                                           //get next row-number
        sOutPP+="<input type=hidden name=\"item_name_"       +sN+"\" value=\""+ "TAX"                                                           + "\">";
        sOutPP+="<input type=hidden name=\"item_description_"+sN+"\" value=\""+ "Tax"+(RegionsUsed?" for "+RegionTable[RegionSelected]:"")      + "\">";
        sOutPP+="<input type=hidden name=\"item_price_"      +sN+"\" value=\""+ moneyFormat(fTax)                                               + "\">";
        sOutPP+="<input type=hidden name=\"item_quantity_"   +sN+"\" value=\""+ "1"                                                             + "\">";
        sOutPP+="<input type=hidden name=\"item_currency_"   +sN+"\" value=\""+ gcCurrency                                                      + "\">";
      }
      sOutPP += "<input type=hidden name=\"ship_method_price_1\"     value=\""+ moneyFormat(fShipping)                                          + "\">";
      sOutPP += "<input type=hidden name=\"ship_method_currency_1\"  value=\""+ gcCurrency                                                      + "\">";
      sOutPP += "<input type=hidden name=\"ship_method_name_1\"      value=\""+ ShipTable[ZoneSelected].zone+" "+sComputeShippingNote           + "\">";
      sOutPP += "<input type=hidden name=\"_charset_\"/>";                      //Google says this is required, though no alternatives(?)
   }else if(PP=="is" && iNumberOrdered){                //===InternetSecure===
      sOutPP+=  "|"+moneyFormat(fShipping)+"::1::SHIP::"+ShipTable[ZoneSelected].zone+" "+sComputeShippingNote+  "::"+isFlags;  //Shipping as item
      sOutPP+=  "|"+moneyFormat(fTax)+"::1::TAX::Tax"+(RegionsUsed?" for "+RegionTable[RegionSelected]:"")+      "::"+isFlags;  //Tax as item
      sOutPP+=  "\">";
   }else if(PP=="cgi"){                                 //===cgi:CUSTOM===      //was if(HiddenFieldsToCheckout)
      sOutPP += "<input type=hidden name=\""+OutputOrderSubtotal+"\" value=\""+ MoneySymbol + moneyFormat(fTotal)                               + "\">";
      sOutPP += "<input type=hidden name=\""+OutputOrderShipping+"\" value=\""+ MoneySymbol + moneyFormat(fShipping)                            + "\">";
      sOutPP += "<input type=hidden name=\""+OutputOrderTax     +"\" value=\""+ MoneySymbol + moneyFormat(fTax)                                 + "\">";
      sOutPP += "<input type=hidden name=\""+OutputOrderTotal   +"\" value=\""+ MoneySymbol + moneyFormat(fTotal + fShipping + fTax)            + "\">";
      sOutPP += "<input type=hidden name=\""+OutputOrderZone    +"\" value=\""+ ShipTable[ZoneSelected].zone+" "+sComputeShippingNote           + "\">";
      sOutPP += "<input type=hidden name=\""+OutputOrderRegion  +"\" value=\""+ (RegionsUsed?RegionTable[RegionSelected]:"")                    + "\">";  //ER: new
   }
   DEBUG8(sOutPP);                                      //2008-03-09 separate sOutput and sOutPP makes for nicer debugging
}
//------------------------------------------------------------------------
// FUNCTION: AddTaxSubtotalLines
// RECEIVES: INC string - is either empty-string or strINCLUDEDINTOTAL
// RETURNS: appends to global var sOutput
// ER: made this a function to improve maintainability;
// 2009-03-25: stop showing Region-name;  +(RegionsUsed?RegionTable[RegionSelected]:"")+END  --> +END
//------------------------------------------------------------------------
function AddTaxSubtotalLines(INC,COL,BEG,END){  if(COL==null)COL=7;  if(BEG==null)BEG="<B>";  if(END==null)END="</B>";
   if(TaxNames.length>=2){
      for(T=0;T<TaxRates.length;++T) if(fTaxA[T]) sOutput += 
         "<TR><TD CLASS=\"noptotal\" COLSPAN="+COL+">"+BEG+strTAX+"-"+TaxNames[T]+INC+"&nbsp; "+END+"</TD>" +
         "<TD CLASS=\"noptotal\" ALIGN=RIGHT>"+BEG + MoneySymbol + moneyFormat(fTaxA[T]) +END+"</TD></TR>";
   }else{
      var fTaxAsum=0;  for(T=0;T<TaxRates.length;++T) fTaxAsum+=fTaxA[T];
      if(fTaxAsum) sOutput += 
         "<TR><TD CLASS=\"noptotal\" COLSPAN="+COL+">"+BEG+strTAX+INC+"&nbsp; "+END+"</TD>" +
         "<TD CLASS=\"noptotal\" ALIGN=RIGHT>"+BEG + MoneySymbol + moneyFormat(fTaxAsum) +END+"</TD></TR>";
   }
}


//------------------------------------------------------------------------
// FUNCTION: ManageCart
// PARAMETERS: Null
// PURPOSE: Draw current cart product table on HTML page
//------------------------------------------------------------------------
function ManageCart(PP) {  if(PP==null)PP=PaymentProcessor;                             //2009-04-01: also support old method with PaymentProcessor as global option
   //ER: replaced  fWeight-->PkgAsOne.weight;  sTotal-->moneyFormat(fTotal);  sTax-->moneyFormat(fTax);  sShipping-->moneyFormat(fShipping);
   //ER: iNumberOrdered, ZoneSelected, ZoneChecked, RegionSelected, RegionChecked  are now global vars set by ReadCartComputePrices routine;
   //ER: fTotal, fShipping, fTax, fTaxA, g_TotalCost                               are now global vars set by ReadCartComputePrices routine;
   //
   var MoreState=iGetCookie("MoreState"); if(MoreState==null) MoreState= (DisplayWtColumn?1:0)*2 + (DisplaySzColumn?1:0);       //ER: MoreState, for DynamicWtSzColumns
   ReadCartComputePrices();     //ER: new
   sDescAIO="";                 //initialize the All-in-one-Description for cart-less payment-processors
   sOutPP="";
   sOutput = "<TABLE CELLSPACING=0 CELLPADDING=2 BORDER=0 CLASS=\"nopcart\"><TR>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+(DisplayImgColumn?strTLabel:"")+"</B></TD>"+   //2009-03-21
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strILabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=LEFT  ><B>"+strDLabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strQLabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=RIGHT ><B>"+strPLabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=RIGHT ><B>"+(MoreState&2?strWLabel:"&nbsp;")+"</B></TD>"+  //ER: was: (DisplayShippingColumn?"<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strSLabel+"</B></TD>":"") +
      "<TD CLASS=\"nopheader\" ALIGN=RIGHT ><B>"+(MoreState&1?strZLabel:"&nbsp;")+"</B></TD>"+  //ER: new
      "<TD CLASS=\"nopheader\" ALIGN=RIGHT ><B>"+strRLabel+"</B></TD></TR>";
   if(iNumberOrdered==0)sOutput+="<TR><TD COLSPAN=8 CLASS=\"nopentry\"><CENTER><BR><B>"+strCartEmpty+"</B><BR><BR></CENTER></TD></TR>"; //ER: now subject to translation
   for(var i=1; i<=iNumberOrdered; ++i){
      var sCLASS="nopentry"; if(Math.round(i/2)==(i/2)) sCLASS="nopeven";               //ER: to eliminate duplication of code for even/odd background on rows
      sOutput += "<TR>";
      if(DisplayImgColumn)      sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=CENTER><IMG SRC="+ImgPrefix+Cart[i].ID+"."+DisplayImgColumn + "></TD>";      //2009-03-21+22
      else                      sOutput += "<TD CLASS=\""+sCLASS+"\"></TD>";
      if(1)                     sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=CENTER>" + Cart[i].ID + "</TD>";
      //if(Cart[i].ADDTLINFO)   sOutput += "<TD CLASS=\""+sCLASS+"\">" + Cart[i].NAME + " - <I>"+ Cart[i].ADDTLINFO + "</I></TD>";  else//yanked 2008-02-07
      if(1)                     sOutput += "<TD CLASS=\""+sCLASS+"\">" + Cart[i].NAME + "</TD>";
      if(DisplayChangeQty)      sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=CENTER><INPUT TYPE=TEXT NAME=Q SIZE=2 VALUE=\"" + Cart[i].QUANTITY + "\" onChange=\"ChangeQuantity("+i+",this.value)\" onkeydown=\"return ChangeQuantityIEkluge(event,"+i+",this.value)\"></TD>";    //2009-04-01: Eli Charne workaround for IE7 beeping on Enter
      else                      sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=CENTER>" + Cart[i].QUANTITY + "</TD>";
      if(1)                     sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=RIGHT>"+ MoneySymbol + moneyFormat(Cart[i].PRICEAVG)+strEA+"</TD>";  //ER: "/ea" now subject to translation
      if(MoreState&2)           sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=RIGHT>"+ WtRnd(Cart[i].WEIGHT)+WTUNITS+"</TD>";      //ER: display WEIGHT column (was "shipping" column)
      else                      sOutput += "<TD CLASS=\""+sCLASS+"\"></TD>";                                                    //ER: N/A->empty-string
      if(MoreState&1)           sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=RIGHT>&nbsp; "+ Cart[i].LENGTH+"x"+Cart[i].WIDTH+"x"+Cart[i].HEIGHT+SZUNITS + "</TD>";       //ER: new
      else                      sOutput += "<TD CLASS=\""+sCLASS+"\"></TD>";
      sOutput += "<TD CLASS=\""+sCLASS+"\" ALIGN=RIGHT>&nbsp; <input type=button value=\""+strRButton+"\" onClick=\"RemoveFromCart("+i+")\" class=\"nopbutton\"></TD>"; //ER: was align=CENTER
      sOutput += "</TR>";
      //--ER: ManageCart producing PaymentProcessor-style hidden-fields is new (for ONE-step checkout);  the NopDesign version only offers "cgi" style here
      AddPaymentProcessorFieldsForOneRow(PP, i);                                        //ER: add payment-processor form-fields for row-i;  2009-04-01: PP
   }
   if((DisplaySubtotalRow&1) && fShipping+fTax!=0){                                     //2008-02-07: dont show SUBTOTAL if same as TOTAL;  2009-03-28: new option
      sOutput += "<TR><TD CLASS=\"noptotal\" COLSPAN=7><B>"+strSUB+"</B></TD>";
      sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fTotal) + "</B></TD></TR>";
   }
   if(DisplayPkgAttrRow && (PkgAsOne.weight+PkgAsOne.size.height) && iNumberOrdered){   //ER: new option controls this line showing + omit if weightless & sizeless
      var MoreLessButton=(MoreState==DynamicWtSzColumns?strLButton:strMButton);         //ER: initialize according to MoreState
      var bW=MoreState&2, bw=bW^2, sW="&nbsp; " +PkgAsOne.weight+WTUNITS;               //ER: total package WEIGHT will go in WEIGHT-col, or in 1st
      var bS=MoreState&1, bs=bS^1, sS="&nbsp; " +SizeStr(PkgAsOne.size)+SZUNITS;        //ER: total package SIZE will go in SIZE-col, or in 1st
      if(DynamicWtSzColumns) {bw&=DynamicWtSzColumns; bs&=DynamicWtSzColumns;}          //ER: only show in first-col if ever shown  (Wt-only but no Dynamic-cols??)
      sOutput += "<TR><TD CLASS=\"noptotal\" COLSPAN=5><B>"+strWTSZTOT+(bw?sW:"")+(bs?sS:"")+"</B></TD>";       //ER: first column gets attribs when in LessInfo state
      sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + (bW?sW:"") +"</B></TD>";                            //ER: package weight column
      sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + (bS?sS:"") +"</B></TD>";                            //ER: package size column
      if(DynamicWtSzColumns)  sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT>&nbsp; <input type=button value=\""+MoreLessButton+"\" onClick=\"MoreLessInfo()\" class=\"nopbutton\"></TD>";      //ER: new
      else                    sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT></TD>";
      sOutput += "</TR>";
   }
   //Display the Shipping-Zone choices;  ER: Zone Defns are now table-driven; see description up front
   //ER: note: show no button as checked if user will be prompted for Zone (see the setting of ZoneChecked above)
   if(ShipTable.length>1 && (PkgAsOne.weight+PkgAsOne.size.height) && iNumberOrdered){  //ER: if more than one zone then customer must be able to pick
      sOutput += "<TR><TD COLSPAN=8 CLASS=nopship><TABLE CELLSPACING=0 CELLPADDING=0>"; //2009-03-26: use nested table, removed COLSPAN
      sOutput += "<TR><TD CLASS=\"nopship\"><B>"+strSHIPPINGZONE+"</B></TD>";           //ER: was:ALIGN=CENTER  was:"UPS<BR>SHIPPING<BR>ZONE" now subject to translation
      sOutput += "<TD CLASS=\"nopship\" STYLE=\"padding-left:1em\">";
      for(var z=0; z<ShipTable.length; z++) sOutput+= "<input type=radio name=\"ZONE\" value=\""+z+"\"" +
         (z==ZoneChecked?" checked":"") +                                               //ER: now adding the "checked" attrib here
         " onClick=\"NewZone(this.value)\">"+ShipTable[z].zone+"<br>";                  //ER: ComputeShipping-->NewZone  in onClick
      sOutput += "</TD></TR>";
      sOutput += "</TABLE></TD></TR>";                                                  //2009-03-26: nested table
   }
   if(DisplayShippingRow && (PkgAsOne.weight+PkgAsOne.size.height) && iNumberOrdered){
      sOutput += "<TR><TD CLASS=\"noptotal\" COLSPAN=7><B>" + strSHIP+"&nbsp; " + ShipTable[ZoneSelected].zone+"</B>&nbsp;&nbsp;" + sComputeShippingNote +"</TD>";
      sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fShipping) + "</B></TD></TR>";
   }
   if((DisplaySubtotalRow&2) && fTax!=0 && !(DisplaySubtotalRow==3 && fShipping==0)){   //2009-03-28: new option controls SUBTOTAL;  plus dont show if content-free
      sOutput += "<TR><TD CLASS=\"noptotal\" COLSPAN=7><B>"+strSUB+"</B></TD>";
      sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fTotal+fShipping) + "</B></TD></TR>";
   }
   //ER: have overhauled the way the Region-choices are shown & how changes are handled;  now very similar to the Zone-choices...
   //ER: note: RegionFromZoneOverrides means Region is always derived from Zone, so no user-choosing needed
   //ER: note: show no button as checked if user will be prompted for region (see the setting of RegionChecked above)
   //2009-05-26: option to suppress Region-choices when possible, for use in NY-State demo
   if(RegionsUsed && !RegionFromZoneOverrides && !(RegionSuppressible && RegionFromZoneOvA[ZoneSelected]) && iNumberOrdered){   //suppressible if Zone->Region unique
      var NC=Math.ceil(RegionTable.length/DisplayRegionColumns);                        //2009-03-28: multi-column radio-buttons
      sOutput += "<TR><TD COLSPAN=8 CLASS=\"noptotal\"><BR></TD></TR>";                 //2009-04-11: some vertical whitespace
      sOutput += "<TR><TD COLSPAN=8 CLASS=nopship><TABLE CELLSPACING=0 CELLPADDING=0>"; //2009-03-26: use nested table, removed COLSPAN
      sOutput += "<TR>";
      sOutput += "<TD CLASS=\"nopship\"><B>"+strTAXABLEREGION+"</B></TD>";              //ER: was:ALIGN=CENTER
      sOutput += "<TD CLASS=\"nopship\" VALIGN=TOP STYLE=\"padding-left:1em\">";
      for(var R=0; R<RegionTable.length; ) {
         sOutput+= "<input type=radio name=\"TAX\" value=\""+R+"\"" +
            (R==RegionChecked?" checked":"") +                                          //ER: add the checked attrib
            " onClick=\"NewRegion(this.value)\">"+RegionTable[R]+"<br>";
         ++R; if(R<RegionTable.length && R%NC==0) sOutput+="</TD><TD CLASS=\"nopship\" VALIGN=TOP STYLE=\"padding-left:1em\">"  //2009-03-28: multi-column radio-buttons
      }
      sOutput += "</TD></TR>";
      sOutput += "</TABLE></TD></TR>";                                                  //2009-03-26: nested table
   }
   if(DisplayTaxRow && iNumberOrdered && !DisplayTaxIncluded){                          //ER: show TAX line(s) for NON-tax-included-pricing
      AddTaxSubtotalLines("");
   }
   sOutput += "<TR><TD CLASS=\"noptotal\" COLSPAN=7><B>"+strTOT+"</B></TD>";            //ER: now show the TOTAL line whether or not RegionsUsed
   sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fTotal + fShipping + fTax) + "</B></TD></TR>";
   if(DisplayTaxRow && iNumberOrdered && DisplayTaxIncluded){                           //ER: show tax line(s) for TAX-INCLUDED-pricing (new)
      AddTaxSubtotalLines(" "+strINCLUDEDINTOTAL, 7, "<i>", "</i>");
   }
   if(DisplayTaxRow && gVat && RegionSelected<=SameCountry&&ShipTaxName!="")sOutput +=  //ER: show tax included in the shipping-charge, to customer in same country
      "<TR><TD CLASS=\"noptotal\" COLSPAN=7><i>" + ShipTaxName +"</i></TD>" + 
      "<TD CLASS=\"noptotal\" ALIGN=RIGHT>" + MoneySymbol+moneyFormat(gVat) +"</TD></TR>";
   sOutput += "</TABLE>";
   //
   //--ER: ManageCart producing PaymentProcessor-style hidden-fields is new (to enable ONE-step checkout);  the NopDesign version only offers "cgi" style here
   AddPaymentProcessorFieldsFinal(PP);                                                  //ER: add the final (cart-wide) payment-processor fields;  2009-04-01: PP
   document.write(sOutput+sOutPP);
   document.close();
}

//------------------------------------------------------------------------
// FUNCTION:    ValidateCart
// PARAMETERS:  Form to validate
// RETURNS:     true/false
// PURPOSE:     Validate the managecart form
//------------------------------------------------------------------------
function ValidateCart(theForm){
   if(isNaN(g_TotalCost)){
      alert(strTotalNaN);               //ER: was NoQtyPrompt
      return false;
   }
   if(g_TotalCost < MinimumOrder){
      alert(MinimumOrderPrompt);
      return false;
   }
   //ER: because of my defaults, now need to use the presence of cookies to tell whether user has made a Zone or Region selection;
   //ER: 1st test was: !RadioChecked(theForm.ZONE)
   //ER: 2nd test was: !RadioChecked(theForm.TAX)  -- actually it was: !RadioChecked(eval("theForm."+OutputOrderTax))  before simplifying OutputOrderTax-->"TAX"
   var N=iGetCookie("NumberOrdered",0);  if(N==0) return;               //skip the following if cart is empty;  only needed for the perverse use of MinimumOrder==0
   var ZoneCookie=   iGetCookie("ZoneSelected");
   var RegionCookie= iGetCookie("RegionSelected");
   if(ZoneCookie==null && (PkgAsOne.weight+PkgAsOne.size.height) && ShipTable.length>1 && ZonePrompt!="" && !(RegionCookie!=null && ZoneFromRegionOvA[RegionCookie])){
      alert(ZonePrompt);
      return false;
   }
   if(RegionCookie==null && RegionsUsed && RegionPrompt!="" && !RegionFromZoneOverrides && !(ZoneCookie!=null && RegionFromZoneOvA[ZoneCookie])){
      alert(RegionPrompt);
      return false;
   }
   return true;
}

//------------------------------------------------------------------------
// FUNCTION: CheckoutCart
// PARAMETERS: Null
// PURPOSE: Draw current cart product table on HTML page for checkout;
// NOTE: produces a simpler view of the cart, compared to ManageCart, 
// and one without controls (Remove-from-Cart etc).
//------------------------------------------------------------------------
function CheckoutCart(PP) {  if(PP==null)PP=PaymentProcessor2;                          //2009-04-01: also support old method with PaymentProcessor2 as global option
   ReadCartComputePrices();     //ER: new
   sDescAIO="";                 //initialize the all-in-one-Description for cart-less payment-processors
   sOutPP="";
   sOutput = "<TABLE CELLSPACING=0 CELLPADDING=2 BORDER=0 CLASS=\"nopcart\"><TR>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strILabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strDLabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strQLabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strPLabel+"</B></TD>" +
      "<TD CLASS=\"nopheader\" ALIGN=CENTER><B>"+strALabel+"</B></TD></TR>";            //ER: strALabel now shown unconditionally
   for(var i=1; i<=iNumberOrdered; ++i){
      var sCLASS="nopentry"; if(Math.round(i/2)==(i/2)) sCLASS="nopeven";               //ER: to eliminate duplication of code for even/odd background on rows
      sOutput += "<TR><TD CLASS=\""+sCLASS+"\" ALIGN=CENTER>" + Cart[i].ID + "</TD>";
      //if(Cart[i].ADDTLINFO!="") sOutput+= "<TD CLASS=\""+sCLASS+"\">" + Cart[i].NAME + " - <I>"+ Cart[i].ADDTLINFO + "</I></TD>";  else//yanked 2008-02-07
      sOutput+="<TD CLASS=\""+sCLASS+"\">" + Cart[i].NAME + "</TD>";
      sOutput+="<TD CLASS=\""+sCLASS+"\" ALIGN=CENTER>" + Cart[i].QUANTITY + "</TD>";
      sOutput+="<TD CLASS=\""+sCLASS+"\" ALIGN=RIGHT>"+MoneySymbol+moneyFormat(Cart[i].PRICEAVG)+strEA+"</TD>";                 //ER: "/ea" now subject to translation
      sOutput+="<TD CLASS=\""+sCLASS+"\" ALIGN=RIGHT>"+MoneySymbol+moneyFormat(Cart[i].QUANTITY*Cart[i].PRICEAVG)+"</TD></TR>"; //ER: now shown unconditionally
      AddPaymentProcessorFieldsForOneRow(PP, i);                                        //ER: add payment-processor fields for row-i;  2009-04-01: PaymentProcessor2-->PP
   }
   if((DisplaySubtotalRow&1) && fShipping+fTax!=0){                                     //2008-02-07: dont show SUBTOTAL if same as TOTAL;  2009-03-28: new option
      sOutput+= "<TR><TD CLASS=\"noptotal\" COLSPAN=4><B>"+strSUB+"</B></TD>";
      sOutput+= "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fTotal) + "</B></TD></TR>";
   }
   if(DisplayShippingRow){
      //sOutput+= "<TR><TD CLASS=\"noptotal\" COLSPAN=4><B>"+strWTSZTOT+"</B></TD>";
      //sOutput+= "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + fWeight + WTUNITS + "</B></TD>";
      sOutput+= "<TR><TD CLASS=\"noptotal\" COLSPAN=4><B>" + strSHIP+"&nbsp; "+ShipTable[ZoneSelected].zone+"</B></TD>";        //ER: removed "for"
      sOutput+= "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fShipping) + "</B></TD></TR>";
   }
   if((DisplaySubtotalRow&2) && fTax!=0 && !(DisplaySubtotalRow==3 && fShipping==0)){   //2009-03-28: new option controls SUBTOTAL;  plus dont show if content-free
      sOutput += "<TR><TD CLASS=\"noptotal\" COLSPAN=4><B>"+strSUB+"</B></TD>";
      sOutput += "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fTotal+fShipping) + "</B></TD></TR>";
   }
   if(DisplayTaxRow && !DisplayTaxIncluded){                                            //ER: removed ||RegionsUsed;  now only for NON-tax-included pricing
      AddTaxSubtotalLines("", 4);
   }
   sOutput+= "<TR><TD CLASS=\"noptotal\" COLSPAN=4><B>"+strTOT+"</B></TD>";
   sOutput+= "<TD CLASS=\"noptotal\" ALIGN=RIGHT><B>" + MoneySymbol + moneyFormat(fTotal + fShipping + fTax) + "</B></TD></TR>";
   if(DisplayTaxRow && DisplayTaxIncluded){                                             //ER: show tax line(s) for TAX-INCLUDED-pricing (new)
      AddTaxSubtotalLines(" "+strINCLUDEDINTOTAL, 4, "<i>", "</i>");
   }
   if(DisplayTaxRow && gVat && RegionSelected<=SameCountry&&ShipTaxName!="")sOutput +=  //ER: show tax included in the shipping-charge, to customer in same country
      "<TR><TD CLASS=\"noptotal\" COLSPAN=4><i>" + ShipTaxName +"</i></TD>" + 
      "<TD CLASS=\"noptotal\" ALIGN=RIGHT>" + MoneySymbol+moneyFormat(gVat) +"</TD></TR>";
   sOutput+= "</TABLE>";
   AddPaymentProcessorFieldsFinal(PP);                                                  //ER: add the final payment-processor fields;  2009-04-01: PaymentProcessor2-->PP
   document.write(sOutput+sOutPP);
   document.close();
}

//------------------------------------------------------------------------
// FUNCTION: PaymentProcessorFields
// RECEIVES: PP is the payment-processor-code;
// PURPOSE: Add payment-processor fields, to allow a 2nd PaymentProcessor.
//------------------------------------------------------------------------
function PaymentProcessorFields(PP) {                                                   //2009-04-01: also support PaymentProcessor as global option==??==
   ReadCartComputePrices();     //ER: new
   sDescAIO="";                 //initialize the all-in-one-Description for cart-less payment-processors
   sOutPP="";
   for(var i=1; i<=iNumberOrdered; ++i) AddPaymentProcessorFieldsForOneRow(PP, i);      //ER: add payment-processor form-fields for row-i
   AddPaymentProcessorFieldsFinal(PP);                                                  //ER: add the final (cart-wide) payment-processor fields
   document.write(sOutPP);
   document.close();
}

//------------------------------------------------------------------------
// FUNCTION: Cart_is_empty
// RETURNS: true/false
//------------------------------------------------------------------------
function Cart_is_empty(){
   iNumberOrdered=iGetCookie("NumberOrdered",0);                //get the nbr-rows-in-cart cookie
   return iNumberOrdered==0;
}
//------------------------------------------------------------------------
// FUNCTION: Print_total
// PARAMETERS: none
// PURPOSE: Display cost currently racked up by shopper, on the HTML page
//------------------------------------------------------------------------
function Print_total(){
   ReadCartComputePrices();
   document.write(moneyFormat(fTotal));
}
//------------------------------------------------------------------------
// FUNCTION: Print_number_items
// PARAMETER: true/false - true to get "item"/"items" appended;  use false in any non-English application
// PURPOSE: Display number of items currently racked up by shopper, on the HTML page
//------------------------------------------------------------------------
function Print_number_items(Verbose){
   ReadCartComputePrices();
   sOutput= "" + g_TotalQty;
   if(Verbose) sOutput+= (g_TotalQty==1?" item":" items");
   document.write(sOutput);
}
Print_total_products = Print_number_items;      //support the old name
//------------------------------------------------------------------------
// FUNCTION: Print_cart_summary
// PARAMETERS: strings to follow QTY singular, follow QTY plural, precede AMT;  may be omitted in an English application
// PURPOSE: Display number of items in the cart and their total cost, on the HTML page
//------------------------------------------------------------------------
function Print_cart_summary(B1,B2,C){  if(B1==null)B1=" item"; if(B2==null)B2=" items"; if(C==null)C=", at a cost of ";
   ReadCartComputePrices();
   sOutput= "" + g_TotalQty + (g_TotalQty==1?B1:B2) + C + MoneySymbol+moneyFormat(fTotal);
   document.write(sOutput);
}
//========================================================================
// END NopDesign + ER Shopping-Cart
//========================================================================
